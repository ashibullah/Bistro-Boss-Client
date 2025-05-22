
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import GoogleSignIn from '../Components/GoogleSignIn';

import { axiosInstance } from '../axios/axiosInstance';
import toast from 'react-hot-toast';
import useAuth from '../Hooks/useAuth';

const Signup = () => {
    const navigate = useNavigate();
    const { createUser, setUser, updateUserProfile } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { email, password, name } = data;
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                const email = user.email;
                const userObj = { name, email }
                axiosInstance.post('/users', userObj)

                setUser(user);
                const defImg = 'https://th.bing.com/th/id/OIP.SJouM0O5VwvVjWEmGGdBLQHaHa?rs=1&pid=ImgDetMain';

                updateUserProfile({ photoURL: defImg, displayName: name })
                    .then(() => {
                        toast.success('Profile created successfully!');
                    })
                    .catch((error) => {
                        toast.error('Error Updating Profile')
                        console.error("Error updating user profile:", error);
                    });
                navigate('/');

            })
            .catch((error) => {
                console.log(error);
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('This email is already registered!');
                } else {
                    toast.error(error.message || 'An error occurred during registration');
                }
            });
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{6,}$/,
                                    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                                }
                                ,
                            })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <span
                        className="text-orange-500 cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </p>
                <div className='mt-4'>
                    <GoogleSignIn />
                </div>
            </div>
        </div>
    );
};

export default Signup;
