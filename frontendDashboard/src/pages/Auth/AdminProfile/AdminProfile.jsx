import  { useState } from "react";
import { FaUserPlus, FaTrash, FaEdit } from "react-icons/fa";

const AdminProfile = () => {
    // const [adminName, setAdminName] = useState("Admin Name"); // Replace with actual data fetching
    const [subAdmins, setSubAdmins] = useState([
        { id: 1, name: "John Doe", role: "Editor" },
        { id: 2, name: "Jane Smith", role: "Moderator" },
    ]);

    const handleAddSubAdmin = () => {
        const newSubAdmin = { id: Date.now(), name: "New Sub-Admin", role: "Role" };
        setSubAdmins([...subAdmins, newSubAdmin]);
    };

    const handleDeleteSubAdmin = (id) => {
        setSubAdmins(subAdmins.filter(subAdmin => subAdmin.id !== id));
    };

    const handleUpdateSubAdmin = (id) => {
        const updatedSubAdmins = subAdmins.map(subAdmin =>
            subAdmin.id === id ? { ...subAdmin, role: "Updated Role" } : subAdmin
        );
        setSubAdmins(updatedSubAdmins);
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-700">Admin Profile</h1>
                {/*<p className="mt-2 text-lg text-gray-600">Welcome, {adminName}!</p>*/}

                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-700">Manage Sub-Admins</h2>
                    <button
                        className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        onClick={handleAddSubAdmin}
                    >
                        <FaUserPlus className="mr-2" /> Add Sub-Admin
                    </button>

                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        {subAdmins.length === 0 ? (
                            <p className="text-gray-500">No sub-admins added yet.</p>
                        ) : (
                            <ul className="space-y-3">
                                {subAdmins.map(subAdmin => (
                                    <li key={subAdmin.id} className="flex justify-between items-center bg-white p-3 shadow rounded-lg">
                                        <span className="text-gray-700">{subAdmin.name} - {subAdmin.role}</span>
                                        <div className="space-x-2">
                                            <button className="text-green-600 hover:text-green-800" onClick={() => handleUpdateSubAdmin(subAdmin.id)}>
                                                <FaEdit />
                                            </button>
                                            <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteSubAdmin(subAdmin.id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
