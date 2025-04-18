import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleSignIn from '../Components/GoogleSignIn';

const Signup = () => {
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        // Add your signup logic here
        console.log('Signed up');
        navigate('/'); // Redirect after successful signup
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
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
