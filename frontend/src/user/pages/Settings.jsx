import React, { useEffect, useState } from "react";
import UserLayout from "../layout/UserLayout";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);

  // Load saved settings
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userSettings"));

    if (saved) {
      setDarkMode(saved.darkMode);
      setNotifications(saved.notifications);
      setAutoPlay(saved.autoPlay);
      setLanguage(saved.language);
    }
  }, []);

  // Save settings automatically
  useEffect(() => {
    const data = {
      darkMode,
      notifications,
      autoPlay,
      language,
    };

    localStorage.setItem("userSettings", JSON.stringify(data));

    // Dark Mode Apply
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, notifications, autoPlay, language]);

  // Logout All Devices
  const handleLogout = () => {
  const confirmLogout =
    window.confirm(
      "Logout from all devices?"
    );

  if (confirmLogout) {
    localStorage.clear();
    navigate("/login");
  }
};
  // Delete Account
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This action cannot be undone."
    );

    if (!confirmDelete) return;

    setLoading(true);

    setTimeout(() => {
      localStorage.clear();
      alert("Account Deleted Successfully");
      navigate("/");
      setLoading(false);
    }, 1500);
  };

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto text-white">
        <h1 className="text-3xl font-bold mb-8">
          ⚙ Settings
        </h1>

        <div className="bg-[#1e293b] p-6 rounded-2xl space-y-6 shadow-xl border border-slate-700">

          {/* Dark Mode */}
          <div className="flex justify-between items-center">
            <span>🌙 Dark Mode</span>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                darkMode
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
            >
              {darkMode ? "ON" : "OFF"}
            </button>
          </div>

          {/* Notifications */}
          <div className="flex justify-between items-center">
            <span>🔔 Notifications</span>

            <button
              onClick={() =>
                setNotifications(!notifications)
              }
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                notifications
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
            >
              {notifications ? "ON" : "OFF"}
            </button>
          </div>

          {/* Auto Play */}
          <div className="flex justify-between items-center">
            <span>▶ Auto Play Stream</span>

            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-4 py-2 rounded-xl font-semibold transition ${
                autoPlay
                  ? "bg-green-500"
                  : "bg-gray-500"
              }`}
            >
              {autoPlay ? "ON" : "OFF"}
            </button>
          </div>

          {/* Language */}
          <div className="flex justify-between items-center">
            <span>🌐 Language</span>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
              className="bg-[#334155] px-4 py-2 rounded-xl outline-none"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Bengali</option>
            </select>
          </div>

          {/* Save Status */}
          <div className="text-sm text-green-400">
            ✅ Settings saved automatically
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            🚪 Logout All Devices
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 py-3 rounded-xl font-semibold hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading
              ? "Deleting..."
              : "🗑 Delete Account"}
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default Settings;