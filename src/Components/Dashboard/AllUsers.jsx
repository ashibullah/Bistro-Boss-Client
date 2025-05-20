import { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosInstance";
import { FaUserShield } from "react-icons/fa";
import toast from "react-hot-toast";

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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
    };    const handleMakeAdmin = (user) => {
        axiosInstance.patch(`/users/admin/${user._id}`)
            .then(res => {
                if(res.data.modifiedCount > 0) {
                    toast.success(`${user.name} is now an admin`);
                    fetchUsers(); // Refresh the user list
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('Failed to make admin');
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : 'Normal User'}
                                </td>
                                <td>
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-ghost btn-xs"
                                        >
                                            <FaUserShield className="text-lg text-orange-600" />
                                        </button>
                                    )}
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