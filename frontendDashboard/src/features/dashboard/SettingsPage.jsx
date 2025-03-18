import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

const SettingsPage = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [firstName, setFirstName] = useState(JSON.parse(localStorage.getItem("admin")).firstName || "");
    const [lastName, setLastName] = useState(JSON.parse(localStorage.getItem("admin")).lastName || "");
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem("admin")).email || "");
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveChanges = () => {
        setLoading(true); // Start loading animation

        setTimeout(() => {
            const admin = JSON.parse(localStorage.getItem("admin"));
            const storedFirstName = admin.firstName;
            const storedLastName = admin.lastName;

            if (firstName && firstName !== storedFirstName) {
                admin.firstName = firstName;
            }
            if (lastName && lastName !== storedLastName) {
                admin.lastName = lastName;
            }
            localStorage.setItem("admin", JSON.stringify(admin));
            setLoading(false);
            navigate("/dashboard");
            toast.success("Changes saved successfully");
        }, 1500);
    };

    return (
        <div className={`p-8 bg-white shadow rounded h-full ${isDarkMode ? "dark:bg-neutral-900 text-white " : ""}`}>
            {/* Profile Settings */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold">Profile Settings</h3>
                <input
                    type="text"
                    placeholder="First Name"
                    className="p-2 border rounded w-full mb-2 dark:bg-neutral-600 dark:text-gray-300 "
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="p-2 border rounded w-full mb-2 dark:bg-neutral-600 dark:text-gray-300"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    disabled
                    value={email}
                    className="p-2 border rounded w-full mb-2"
                />
                <input
                    type="password"
                    placeholder="New Password"
                    className="p-2 border rounded w-full"
                    value={password}
                    disabled
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

            {/* Save Button */}
            <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    "Save Changes"
                )}
            </button>
        </div>
    );
};

export default SettingsPage;
