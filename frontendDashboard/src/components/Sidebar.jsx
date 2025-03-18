import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const isAdminLoggedIn = () => !!localStorage.getItem("admin");

    const handleNavigation = (path) => {
        if (!isAdminLoggedIn()) {
            toast.warn("You are not logged in. Login to perform any action");
            return;
        }
        navigate(path);
    };

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest(".sidebar")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative">
            {/* Overlay when sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-5 right-[-400px] bg-gray-800 text-white p-2 rounded-full shadow-md md:hidden"
            >
                {isOpen ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
            </button>

            {/* Sidebar */}
            <div
                className={`sidebar bg-gray-800 h-full text-white w-64 min-h-screen p-4 fixed top-0 left-0 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-64"
                } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 z-50`}
            >
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <ul className="mt-6">
                    <li className="mb-2">
                        <button onClick={() => handleNavigation("/dashboard")} className="hover:text-gray-400 block py-2 text-xl font-bold text-left w-full">
                            Analytics
                        </button>
                    </li>
                    <li className="mb-2">
                        <button onClick={() => handleNavigation("/users")} className="hover:text-gray-400 block py-2 text-xl font-bold text-left w-full">
                            User Management
                        </button>
                    </li>
                    <li className="mb-2">
                        <button onClick={() => handleNavigation("/activeUsers")} className="hover:text-gray-400 block py-2 text-xl font-bold text-left w-full">
                            Active Users
                        </button>
                    </li>
                    <li className="mb-2">
                        <button onClick={() => handleNavigation("/settings")} className="hover:text-gray-400 block py-2 text-xl font-bold text-left w-full">
                            Settings
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
