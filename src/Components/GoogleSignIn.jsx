import React from 'react';

const GoogleSignIn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleSignIn;
