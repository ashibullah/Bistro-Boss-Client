import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../Provider/AuthProvider';
import { axiosInstance } from '../axios/axiosInstance';

const GoogleSignIn = () => {
  const { googleSignIn } = useContext(AuthContext);
  const handleGoogleSignIn = () => {  
    googleSignIn()
      .then((result) => {
        const user = result.user;
        // console.log("Google sign-in successful:", user);
        const email = user.email;
        const name = user.displayName;
        const userObj = {name , email}
        axiosInstance.post('/users', userObj)
        
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
      });


  };
  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full py-2 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
    >
      <FcGoogle />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleSignIn;
