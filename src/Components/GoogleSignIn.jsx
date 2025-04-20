import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignIn = () => {
  const handleGoogleSignIn = () => {  

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
