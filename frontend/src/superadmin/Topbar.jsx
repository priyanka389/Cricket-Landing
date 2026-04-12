import React from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">

      {/* Left */}
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <LayoutDashboard className="text-blue-600" size={24} />
        Dashboard
      </h2>

      {/* Right */}
      <div className="flex items-center gap-4">

        <span className="text-sm text-gray-600 font-medium">
          Super Admin
        </span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600 transition shadow"
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>

    </div>
  );
};

export default Topbar;