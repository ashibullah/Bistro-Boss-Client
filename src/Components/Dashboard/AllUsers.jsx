import { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosInstance";
import { FaUserShield, FaUserTimes, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axiosInstance.get('/allusers')
            .then(response => {
                setAllUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                toast.error('Failed to load users');
            });
    };

    const showConfirmationToast = ({ user, title, message, action, successMessage, errorMessage, confirmButton = 'Confirm', confirmClass = 'bg-green-500 hover:bg-green-600' }) => {
        toast((t) => (
            <div className="flex flex-col items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="text-xl font-semibold text-red-600">{title}</div>
                <div className="text-gray-600 dark:text-gray-300">
                    {message} <span className="font-semibold">{user.name}</span>?
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            action()
                                .then(res => {
                                    if (res.data.modifiedCount > 0 || res.data.deletedCount > 0) {
                                        toast.success(successMessage);
                                        fetchUsers();
                                    }
                                })
                                .catch(error => {
                                    console.error(error);
                                    toast.error(errorMessage);
                                });
                        }}
                        className={`px-4 py-2 text-white rounded transition-colors ${confirmClass}`}
                    >
                        {confirmButton}
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 6000,
            style: {
                background: 'transparent',
                boxShadow: 'none',
                padding: '0',
            },
        });
    };

    const handleMakeAdmin = (user) => {
        showConfirmationToast({
            user,
            title: 'Make Admin',
            message: 'Are you sure you want to make',
            action: () => axiosInstance.patch(`/users/admin/${user._id}`),
            successMessage: `${user.name} is now an admin`,
            errorMessage: 'Failed to make admin',
            confirmButton: 'Make Admin',
            confirmClass: 'bg-green-500 hover:bg-green-600'
        });
    };

    const handleRemoveAdmin = (user) => {
        showConfirmationToast({
            user,
            title: 'Remove Admin',
            message: 'Are you sure you want to remove admin rights from',
            action: () => axiosInstance.patch(`/users/remove-admin/${user._id}`),
            successMessage: `${user.name} is no longer an admin`,
            errorMessage: 'Failed to remove admin',
            confirmButton: 'Remove Admin',
            confirmClass: 'bg-orange-500 hover:bg-orange-600'
        });
    };

    const handleDeleteUser = (user) => {
        showConfirmationToast({
            user,
            title: 'Delete User',
            message: 'Are you sure you want to delete',
            action: () => axiosInstance.delete(`/users/${user._id}`),
            successMessage: `${user.name} has been removed`,
            errorMessage: 'Failed to delete user',
            confirmButton: 'Delete',
            confirmClass: 'bg-red-500 hover:bg-red-600'
        });
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    return (
        <div className="w-full p-4">
            <h2 className="text-2xl font-semibold mb-4">All Users: {allUsers.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr className="bg-base-300">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((userlist, index) => (
                            <tr key={userlist._id}>
                                <td>{index + 1}</td>
                                <td>{userlist.name}</td>
                                <td>{userlist.email}</td>
                                <td>
                                    {userlist.role === 'admin' ? 'Admin' : 'Normal User'}
                                </td>
                                <td>
                                    {userlist.role === 'admin' ? (
                                        <button
                                            onClick={() => handleRemoveAdmin(userlist)}
                                            className="btn btn-ghost btn-xs tooltip"
                                            data-tip="Remove Admin"
                                            disabled={user.email === userlist.email}
                                        >
                                            <FaUserTimes className={`text-lg  ${user.email === userlist.email ? 'text-gray-600 opacity-20' : 'text-red-600'}`} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(userlist )}
                                            className="btn btn-ghost btn-xs tooltip disabled"
                                            data-tip="Make Admin"
                                            
                                        >
                                            
                                            <FaUserShield className="text-lg text-green-600" />
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(userlist)}
                                        className="btn btn-ghost btn-xs tooltip"
                                        data-tip="Remove User"
                                    >
                                        <FaTrashAlt className="text-lg text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;