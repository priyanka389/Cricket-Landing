import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Crown } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Shield,
  BarChart3,
  Lock
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/superadmin/dashboard",
      icon: <LayoutDashboard size={18} />
    },
    {
      name: "Admin Management",
      path: "/superadmin/admins",
      icon: <Shield size={18} />
    },
    {
      name: "User Management",
      path: "/superadmin/users",
      icon: <Users size={18} />
    },
    {
      name: "Analytics",
      path: "/superadmin/analytics",
      icon: <BarChart3 size={18} />
    },
    {
      name: "Security",
      path: "/superadmin/security",
      icon: <Lock size={18} />
    }
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] text-white p-5 shadow-xl">

      {/* Logo / Title */}
      <h1 className="text-2xl font-extrabold mb-10 tracking-wide flex items-center gap-2">
  <Crown className="text-yellow-400" size={26} />
  Super Admin
</h1>

      {/* Menu */}
      <div className="flex flex-col gap-2">

        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 
              
              ${isActive
                ? "bg-blue-600 shadow-lg scale-[1.03]"
                : "hover:bg-gray-800 hover:translate-x-1"
              }`}
            >
              <span className={`${isActive ? "text-white" : "text-gray-400"}`}>
                {item.icon}
              </span>

              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}

      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-5 left-5 text-xs text-gray-400">
        © 2026 CricAdmin
      </div>

    </div>
  );
};

export default Sidebar;