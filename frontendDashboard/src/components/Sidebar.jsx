import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-5 left-64 bg-gray-800 text-white p-2 rounded-full shadow-md md:hidden"
      >
        {isOpen ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 min-h-screen p-4 fixed top-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ul className="mt-6">
          <li className="mb-2">
            <Link to="/dashboard" className="hover:text-gray-400 block py-2">
              Analytics
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/users" className="hover:text-gray-400 block py-2">
              User Management
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/settings" className="hover:text-gray-400 block py-2">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
