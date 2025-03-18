import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const SettingsPage = () => {
    const { isDarkMode, toggleTheme } = useTheme(); // Access dark mode globally
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [password, setPassword] = useState('');

    return (
        <div className={`p-8 bg-white shadow rounded h-full ${isDarkMode ? "dark:bg-neutral-900 text-white " : ""}`}>

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
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
                        label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    />
                </FormGroup>
            </div>

            {/* Notification Settings */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                    <span>Email Notifications</span>
                </label>
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
        </div>
    );
};

export default SettingsPage;
