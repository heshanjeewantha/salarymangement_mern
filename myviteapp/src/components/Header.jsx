import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

// Custom hook to detect clicks outside a ref
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
};

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set this dynamically in production
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const [user,setuser] = useState(null);

   useEffect(() => {
    axios
      .get("http://localhost:4000/api/user/profile", { withCredentials: true })
      .then((res) => {
        setuser(res.data.user);
      })
  }, []);


  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));

  const handleLogout =  () => {
        
        axios.post("http://localhost:4000/api/user/logout", {}, { withCredentials: true });
        setIsLoggedIn(false);
        setIsUserMenuOpen(false);
        navigate("/");
        
  };

  
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-white">Hi</h1>
          </Link>

          {/* Right-side icons */}
          <div className="flex items-center space-x-4">
            
            {/* Show greeting if logged in */}
            {isLoggedIn && user &&(
              <div>
                <p className="relative p-2 text-gray-800">
                  <strong className="h-6 w-6">Hi, {user.name}</strong>
                </p>
              </div>
            )}

            {/* User menu button */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 text-white hover:text-black  focus:outline-none"
              >
                <UserIcon className="h-6 w-6" />
              </button>

              {/* Dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border z-50">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-900 hover:bg-gradient-to-r from-blue-400 to-purple-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-900 hover:bg-gradient-to-r from-blue-400 to-purple-200"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-gray-900 hover:bg-gradient-to-r from-blue-400 to-purple-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-gray-900 hover:bg-blue-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
