import React, { useState } from "react";
import { Bell, User, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // 🔐 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // 👉 redirect after logout
    navigate("/"); // ya "/signin"
  };

  return (
    <div className="bg-[#020617] text-white px-6 py-3 flex justify-between items-center shadow-lg border-b border-gray-800">

      {/* 🔷 Left */}
      <h1 className="text-lg font-semibold tracking-wide">
        Admin Dashboard
      </h1>

      {/* 🔷 Right */}
      <div className="flex items-center gap-6">

        {/* 🔔 Notification */}
        <div className="relative cursor-pointer group">
          <Bell className="text-gray-300 group-hover:text-blue-400 transition" size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] px-1.5 py-[1px] rounded-full">
            3
          </span>
        </div>

        {/* 👤 Profile */}
        <div className="relative">

          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
              <User size={16} />
            </div>

            <span className="text-sm text-gray-300 group-hover:text-white transition">
              Admin
            </span>

            <ChevronDown
              size={16}
              className={`text-gray-400 transition ${open && "rotate-180"}`}
            />
          </div>

          {/* 🔽 Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-40 bg-white text-gray-700 rounded-lg shadow-lg overflow-hidden">

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-red-100 transition"
              >
                <LogOut size={16} className="text-red-500" />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminNavbar;