import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Data from '../store/data.js';
import {toast} from "react-toastify";

const AddUserForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'Viewer'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        if(!localStorage.getItem("admin")){
            toast.warn("You are not logged in. Login to perform any action");
            return;
        }
        e.preventDefault();
        const newUser = {
            id: Data.length + 1,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            role: formData.role,
            status: 'active',
        };

        Data.push(newUser);

        navigate('/dashboard');
    };

    return (
        <div className="px-4 dark:bg-neutral-600 rounded-2xl py-10">
            <h2 className="text-lg font-bold mb-4 dark:text-gray-200">Add New User</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="border p-2 rounded" required />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-2 rounded" required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded" required />
                <select name="role" onChange={handleChange} className="border p-2 rounded">
                    <option value="VIEWER">VIEWER</option>
                    <option value="EDITOR">EDITOR</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add User</button>
            </form>
        </div>
    );
};

export default AddUserForm;
