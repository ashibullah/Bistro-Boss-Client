import { useNavigate } from 'react-router-dom';
import GoogleSignIn from '../Components/GoogleSignIn';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const {signInUser, setUser} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        // console.log(e.target[0].value);
        const formemail = form.elements.email.value;
        const formpassword = form.elements.password.value; 

        signInUser(formemail, formpassword)
        .then((result) => {
            const user = result.user;
            setUser(user);
            navigate('/');
        })
        .catch((error) => {
            console.error("Login failed:", error);
        });
 
 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name='email'
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name='password'
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                        onSubmit={handleLogin}
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <span className="text-orange-500 cursor-pointer" onClick={() => navigate('/signup')}>Register</span>
                </p>

                <div className='mt-4'>
                    <GoogleSignIn />
                </div>
            </div>


        </div>
    );
};

export default Login;
