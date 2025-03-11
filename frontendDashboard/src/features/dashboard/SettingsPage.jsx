import React, { useState } from 'react';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [password, setPassword] = useState('');

  return (
    <div className="p-8 bg-white shadow rounded">

      {/* Profile Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Profile Settings</h3>
        <input type="text" placeholder="Full Name" className="p-2 border rounded w-full mb-2" />
        <input type="email" placeholder="Email" className="p-2 border rounded w-full mb-2" />
        <input
          type="password"
          placeholder="New Password"
          className="p-2 border rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Appearance Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Appearance</h3>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <span>Enable Dark Mode</span>
        </label>
      </div>

      {/* Notification Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
          <span>Email Notifications</span>
        </label>
      </div>

      {/* Save Button */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
    </div>
  );
};

export default SettingsPage;
