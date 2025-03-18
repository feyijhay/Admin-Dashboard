import  { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Data from "../store/data";
import {toast} from "react-toastify";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const user = Data.find((user) => user.id === parseInt(id));


    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        password: "",
        role: user?.role || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        if(!localStorage.getItem("admin")){
            toast.warn("You are not logged in. Login to perform any action");
            return;
        }        e.preventDefault();

        const userIndex = Data.findIndex((user) => user.id === parseInt(id));
        if (userIndex !== -1) {
            Data[userIndex] = { ...Data[userIndex], ...formData };
        }

        navigate("/dashboard");
    };

    if (!user) {
        return <h2>User not found</h2>;
    }

    return (
        <div className="p-4  mx-auto bg-white shadow-md rounded-lg w-full dark:bg-neutral-600 text-gray-200">
            <h2 className="text-2xl font-bold mb-4 pl-2">Edit User</h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-full flex justify-center flex-col">
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={user.name.split(" ")[0]}
                    className="w-[95%] border p-2 rounded pl-10"
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={user.name.split(" ")[1]}
                    className="w-[95%] border p-2 rounded pl-10"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-[95%] border p-2 rounded pl-10"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="New Password (optional)"
                    className="w-[95%] border p-2 rounded pl-10"
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-[95%] border p-2 rounded pl-10"

                >
                    <option value="">Select Role</option>
                    <option value="VIEWER">VIEWER</option>
                    <option value="EDITOR">EDITOR</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                <button type="submit" className="w-[95%] bg-blue-500 text-white p-2 rounded">
                    Update User
                </button>
            </form>
        </div>
    );
};

export default EditUser;
