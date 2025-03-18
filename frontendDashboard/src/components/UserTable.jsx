import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const UserTable = ({ users }) => {
    const [userList, setUserList] = useState(users);
    const navigate = useNavigate();

    const isAdminLoggedIn = () => !!localStorage.getItem("admin");

    const handleEdit = (userId) => {
        if (!isAdminLoggedIn()) {
            toast.warn("You are not logged in. Login to perform any action");
            return;
        }
        navigate(`/edit-user/${userId}`);
    };

    const handleDelete = (userId) => {
        if (!isAdminLoggedIn()) {
            toast.warn("You are not logged in. Login to perform any action");
            return;
        }
        setUserList(userList.filter((user) => user.id !== userId));
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full hidden md:table border-collapse border border-gray-200">
                <thead>
                <tr className="bg-gray-100">
                    <th className="text-left py-2 px-4 border">Name</th>
                    <th className="text-left py-2 px-4 border">Email</th>
                    <th className="text-left py-2 px-4 border">Role</th>
                    <th className="text-left py-2 px-4 border">Status</th>
                    <th className="text-left py-2 px-4 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {userList.map((user) => (
                    <tr key={user.id} className="border">
                        <td className="py-2 px-4">{user.name}</td>
                        <td className="py-2 px-4">{user.email}</td>
                        <td className="py-2 px-4">{user.role}</td>
                        <td className="py-2 px-4">
                <span
                    className={`py-1 rounded ${
                        user.status === "active"
                            ? "bg-green-100 text-green-800 px-6"
                            : "bg-red-100 text-red-800 px-4"
                    }`}
                >
                  {user.status}
                </span>
                        </td>
                        <td className="py-2 px-4">
                            <button
                                className="text-blue-500 hover:text-blue-700 mr-2"
                                onClick={() => handleEdit(user.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Mobile View - Card Layout */}
            <div className="md:hidden ">
                {userList.map((user) => (
                    <div key={user.id} className="bg-white p-4 rounded shadow mb-4 border dark:bg-gray-500">
                        <p>
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Role:</strong> {user.role}
                        </p>
                        <p>
                            <strong>Status:</strong>
                            <span
                                className={`ml-2 px-2 py-1 rounded ${
                                    user.status === "active"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                            >
                {user.status}
              </span>
                        </p>
                        <div className="mt-2">
                            <button
                                className="text-blue-500 hover:text-blue-700 mr-2"
                                onClick={() => handleEdit(user.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserTable;
