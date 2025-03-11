import React, { useState } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'inactive' }
  ]);

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
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
          {users.map(user => (
            <tr key={user.id} className="border">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {user.status}
                </span>
              </td>
              <td className="py-2 px-4">
                <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View - Card Layout */}
      <div className="md:hidden">
        {users.map(user => (
          <div key={user.id} className="bg-white p-4 rounded shadow mb-4 border">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Status:</strong>
              <span className={`ml-2 px-2 py-1 rounded ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {user.status}
              </span>
            </p>
            <div className="mt-2">
              <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
              <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(user.id)}>
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
