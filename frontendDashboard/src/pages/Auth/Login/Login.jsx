import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [role, setRole] = useState("Viewer"); // Default to User

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);



        const endpoint = role === "Admin"
            ? "https://admin-dashboard-h7kx.onrender.com/api/v1/Admin/login"
            : "https://admin-dashboard-h7kx.onrender.com/api/v1/User/login";

        try {
            const response = await axios.post(endpoint, { email, password });
            toast.success("Login successful!");
            localStorage.setItem("token", response.data.token);


            // Redirect to dashboard
            role === "Admin" ? navigate("/dashboard") : (window.location.href = "https://www.fortunaeitsolutions.com/");

        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-medium">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                        >
                            <option value="Admin">Admin</option>
                            <option value="Viewer">Viewer</option>
                            <option value="Editor">Editor</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-md"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
