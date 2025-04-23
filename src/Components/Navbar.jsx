import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { BiCart } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logOut, user, setUser, cart } = useAuth();
  const [totalAmount, setTotalAmount] = useState(0);
  // console.log(cart);
  // useEffect(() => {
  //   if (user) {
  //     // console.log(cart.length);
  //   }
  // },[cart]);
  useEffect(() => {
   setTotalAmount(cart.reduce((acc, item) => acc + item.price, 0)) ;
  }, [cart]);


  const handleLogout = () => {
    logOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div className="fixed top-0 z-50 w-full bg-black/30 shadow-sm text-white px-4 md:px-20 lg:px-35">
      <div className="navbar flex justify-between items-center py-2">
        {/* Left: Logo */}
        <div className="flex items-center">
          <NavLink className="flex items-center gap-2 text-xl font-bold" to="/">
            <img src={logo} alt="logo" className="w-10 h-10" />
            Bistro Boss
          </NavLink>
        </div>

        {/* Right: Links + Cart + Auth */}
        <div className="flex items-center gap-2">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center">
            <NavLink className="btn btn-ghost normal-case" to="/">Home</NavLink>
            <NavLink to="/contact" className="btn btn-ghost normal-case">Contact Us</NavLink>
            <NavLink className="btn btn-ghost normal-case" to="/dashboard">Dashboard</NavLink>
            <NavLink to="/menu" className="btn btn-ghost normal-case">Our Menu</NavLink>
            <NavLink to="/order" className="btn btn-ghost normal-case">Order Now</NavLink>

            {/* Conditionally render Login or Avatar */}
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="User avatar"
                      src={user.photoURL || "https://dpbnri2zg3lc2.cloudfront.net/en/wp-content/uploads/old-blog-uploads/processing-animation.gif"}
                    />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow text-black z-50">
                  <li><NavLink className="justify-between">Profile</NavLink></li>
                  <li><NavLink>Settings</NavLink></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <NavLink to="/login" className="ml-4 btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                Login
              </NavLink>
            )}
          </div>

          {/* Cart */}
          <div className="dropdown dropdown-end" >
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator text-3xl">
                <BiCart />
                <span className="badge badge-sm indicator-item bg-orange-500 border-none  rounded-full text-white">{cart.length}</span>
              </div>
            </div>
            <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-50 mt-3 w-80 shadow text-black">
            <div className="p-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-200">
              <div className='flex justify-between items-center mb-2'>

                <span className="font-bold text-sm mb-2">Cart</span>
                <span className="font-bold text-sm mb-2">Total: <span className='text-green-800'>${totalAmount}</span></span>
              </div>

                {cart && cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item._id} className="flex items-center gap-2 bg-white shadow-sm rounded p-2 mb-2">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-orange-500 font-semibold">${item.price}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700 text-lg"
                      >
                        <RxCross2 />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-center text-gray-500">Your cart is empty</p>
                )}

              </div>
            </div>

          </div>

          {/* Hamburger */}
          <div className="lg:hidden">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52 absolute right-4 top-16 text-black lg:hidden">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/contact">Contact Us</NavLink></li>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/menu">Our Menu</NavLink></li>
          <li><NavLink to="/order">Order Now</NavLink></li>
          {user ? (
            <li><button onClick={handleLogout} className="text-red-500 font-semibold">Logout</button></li>
          ) : (
            <li><NavLink to="/login" className="text-orange-500 hover:text-orange-600 font-semibold">Login</NavLink></li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
