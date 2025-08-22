import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/logo.jpeg";

const SidebarItem = ({ label, path, navigate }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <div
      className={`flex items-center space-x-2 p-3 rounded cursor-pointer ${
        isActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
      }`}
      onClick={() => navigate(path)}
    >
      <span>{label}</span>
    </div>
  );
};

const Layout = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <img src={Logo} alt="Logo" className="w-full h-12" />
        </div>
        <div className="flex flex-col mt-4 space-y-2 px-2">
          <SidebarItem label="Dashboard" path="/dashboard" navigate={navigate} />
          <SidebarItem label="Mentors" path="/mentors" navigate={navigate} />
          <SidebarItem label="Mentees" path="/mentees" navigate={navigate} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Topbar */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300 relative">
          {/* Search */}
          <div className="flex items-center border rounded px-3 py-1 w-1/3 focus-within:ring">
            <input type="text" placeholder="Search..." className="w-full outline-none" />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4 relative">
            {/* Profile */}
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="hover:bg-gray-100 rounded-full p-2"
              title="Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                viewBox="0 0 24 24" strokeWidth={1.5} 
                stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" 
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 
                  7.488 0 0 0-5.982 2.975m11.963 
                  0a9 9 0 1 0-11.963 0m11.963 
                  0A8.966 8.966 0 0 1 12 21a8.966 
                  8.966 0 0 1-5.982-2.275M15 
                  9.75a3 3 0 1 1-6 0 3 3 0 
                  1 1 6 0Z" />
              </svg>
            </button>

            {/* Dropdown */}
            {showProfile && (
              <div className="absolute right-12 top-12 bg-white border rounded-lg shadow-md w-56 p-4 z-50">
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-gray-500">johndoe@example.com</p>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/settings");
                  }}
                  className="w-full text-left text-blue-600 hover:underline"
                >
                  Account Settings
                </button>
              </div>
            )}

            {/* Logout */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="hover:bg-gray-100 rounded-full p-2"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>

            </button>
          </div>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-lg font-semibold">Confirm Logout</h2>
              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render child page */}
        <div className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
