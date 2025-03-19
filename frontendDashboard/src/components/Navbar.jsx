import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow p-2 dark:bg-neutral-900 dark:text-white dark:border-b dark:border-white flex items-center justify-between">
            <h1 className="text-xl font-bold">Admin Panel</h1>

            <div className="flex  items-center gap-4 pr-12 md:pr-5">
                {location.pathname !== "/" && location.pathname !== "/login" ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Register
                        </button>
                    </>
                )}

                {/* Sidebar Toggle Button (Moved to the Right) */}
                <button
                    onClick={toggleSidebar}
                    className="text-gray-600 dark:text-white pl-5 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 transition md:hidden"
                >
                    {isSidebarOpen ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
