import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
import Register from "./pages/Auth/Register/Register.jsx";
import Login from "./pages/Auth/Login/Login.jsx";
import Dashboard from "./features/dashboard/Dashboard.jsx";
import Admin from "./features/admin/admin.jsx";
import SettingsPage from "./features/dashboard/SettingsPage.jsx";
import AdminProfile from "./pages/Auth/AdminProfile/AdminProfile.jsx";
import ActiveUsers from "./pages/ActiveUsers.jsx";
import AddUserForm from "./pages/addNewUser.jsx";
import EditUser from "./pages/editUser.jsx";

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const excludePaths = ["/register", "/login"];

    useEffect(() => {
        const isAdminLoggedIn = !!localStorage.getItem("admin");
        if (isAdminLoggedIn && location.pathname === "/") {
            navigate("/dashboard");
        }
    }, [location, navigate]);

    return (
        <div className="flex dark:bg-neutral-900 min-h-screen">
            {!excludePaths.includes(location.pathname) && (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            )}
            <div className="flex-1 dark:bg-neutral-900">
                <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <div className="p-6 dark:bg-neutral-900">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/activeUsers" element={<ActiveUsers />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/adminprofile" element={<AdminProfile />} />
                        <Route path="/add-user" element={<AddUserForm />} />
                        <Route path="/edit-user/:id" element={<EditUser />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
