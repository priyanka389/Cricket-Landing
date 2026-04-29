// admin/components/AdminSidebar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Activity,
  BarChart3,
  User
} from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />
    },
    {
      name: "Matches",
      path: "/admin/matches",
      icon: <Calendar size={18} />
    },
    {
  name: "Manage Squad",
  path: "/admin/manage-squad",
  icon: <Users size={18} />
},
{
  name: "Live Control",
  path: "/admin/live-control",
  icon: <Activity size={18} />
},
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={18} />
    },
    {
      name: "Live Matches",
      path: "/admin/live",
      icon: <Activity size={18} />
    },
    {
  name: "Teams",
  path: "/admin/teams",
  icon: <Users size={18} />
},
{
  name: "Players",
  path: "/admin/players",
  icon: <User size={18} />
},
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: <BarChart3 size={18} />
    }
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] text-white p-5 shadow-xl">

      {/* 🔥 Title same style */}
      <h1 className="text-2xl font-extrabold mb-10 tracking-wide">
        Admin Panel
      </h1>

      {/* 📌 Menu */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 
              
              ${
                isActive
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

      {/* 🔽 Bottom */}
      <div className="absolute bottom-5 left-5 text-xs text-gray-400">
        © 2026 Admin Panel
      </div>

    </div>
  );
};

export default AdminSidebar;