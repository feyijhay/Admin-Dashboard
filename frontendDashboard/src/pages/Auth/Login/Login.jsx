import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("VIEWER");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = role === "ADMIN"
            ? "https://admin-dashboard-h7kx.onrender.com/api/v1/Admin/login"
            : "https://admin-dashboard-h7kx.onrender.com/api/v1/User/login";

        try {
            const response = await axios.post(endpoint, { email, password });
            console.log(role);
            console.log(response);
            if (response.status === 201) {
                toast.success("Login successful!");
                console.log("Login Response:", response.data);
                const user = response.data;
                user.role = role;
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/dashboard");
            } else {
                toast.error(response.data?.message || "Login failed!");
                console.error("Error Response:", response.data);
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error);
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
                            <option value="VIEWER">VIEWER</option>
                            <option value="EDITOR">EDITOR</option>
                            <option value="ADMIN">ADMIN</option>
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
                    <div className="relative">
                        <label className="block font-medium">Password</label>
                        <input
                            type={showPassword ? "text" : "password"} // Toggle between text and password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 pr-10"
                            required
                        />
                        {/* Eye Icon for toggling password visibility */}
                        <span
                            className="absolute right-3 top-10 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </span>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
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
