import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 z-50 w-full bg-black/30 shadow-sm text-white px-4 md:px-20 lg:px-35">
      <div className="navbar flex justify-between items-center py-2">
        {/* Left: Logo */}
        <div className="flex items-center">
          <NavLink className="flex items-center gap-2 text-xl font-bold">
            <img src={logo} alt="logo" className="w-10 h-10" />
            Bistro Boss
          </NavLink>
        </div>

        {/* Right: Links + Cart + Avatar */}
        <div className="flex items-center gap-2">
          {/* Desktop Menu */}
          <div className="hidden lg:flex  items-center">
            <NavLink className="btn btn-ghost normal-case">Home</NavLink>
            <NavLink className="btn btn-ghost normal-case">Contact Us</NavLink>
            <NavLink className="btn btn-ghost normal-case">Dashboard</NavLink>
            <NavLink to={'/menu'} className="btn btn-ghost normal-case">Our Menu</NavLink>
            <NavLink to={'/order'} className="btn btn-ghost normal-case">Order Now</NavLink>
          </div>

          {/* Cart */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0
                    0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-50 mt-3 w-52 shadow text-black">
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow text-black z-50">
              <li>
                <NavLink className="justify-between">
                  Profile <span className="badge">New</span>
                </NavLink>
              </li>
              <li><NavLink>Settings</NavLink></li>
              <li><NavLink>Logout</NavLink></li>
            </ul>
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
          <li><NavLink>Home</NavLink></li>
          <li><NavLink>Contact Us</NavLink></li>
          <li><NavLink>Dashboard</NavLink></li>
          <li><NavLink to={'/menu'}>Our Menu</NavLink></li>
          <li><NavLink to={'/order'}>Order Now</NavLink></li>
        </ul>
      )}

    </div>
  );
};

export default Navbar;
