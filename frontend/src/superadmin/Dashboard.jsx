import React from "react";
import SuperAdminLayout from "./SuperAdminLayout";
import { useNavigate } from "react-router-dom";

import {
  Users,
  Shield,
  Activity,
  IndianRupee,
  ArrowUpRight,
  Bell,
  UserPlus
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Users",
      value: "1,245",
      icon: <Users size={26} />,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Admins",
      value: "18",
      icon: <Shield size={26} />,
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "Active Matches",
      value: "32",
      icon: <Activity size={26} />,
      color: "from-green-500 to-green-700"
    },
    {
      title: "Revenue",
      value: "₹75,000",
      icon: <IndianRupee size={26} />,
      color: "from-orange-500 to-orange-700"
    }
  ];

  return (
    <SuperAdminLayout>

      {/* Top Right Notification Only */}
      <div className="flex justify-end mb-8">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          <Bell size={18} />
          Notifications
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">

        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl p-6 text-white shadow-lg transition transform hover:-translate-y-2 hover:scale-105 duration-300"
            style={{
              background: `linear-gradient(to right, var(--tw-gradient-stops))`,
            }}
          >
            <div className={`bg-gradient-to-r ${item.color} p-5 rounded-2xl`}>

              <div className="flex justify-between items-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  {item.icon}
                </div>
                <ArrowUpRight size={20} />
              </div>

              <p className="text-sm opacity-80">{item.title}</p>
              <h2 className="text-3xl font-bold mt-1">{item.value}</h2>

            </div>
          </div>
        ))}

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6 mt-10">

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Activity
          </h2>

          <ul className="space-y-4 text-gray-600">

            <li className="flex justify-between items-center hover:bg-gray-100 p-2 rounded transition">
              <span className="flex items-center gap-2">
                <UserPlus size={16} className="text-blue-500" />
                New user registered
              </span>
              <span className="text-sm text-gray-400">2 min ago</span>
            </li>

            <li className="flex justify-between items-center hover:bg-gray-100 p-2 rounded transition">
              <span>⚡ Match updated (IND vs AUS)</span>
              <span className="text-sm text-gray-400">10 min ago</span>
            </li>

            <li className="flex justify-between items-center hover:bg-gray-100 p-2 rounded transition">
              <span>👤 Admin created</span>
              <span className="text-sm text-gray-400">1 hr ago</span>
            </li>

            <li className="flex justify-between items-center hover:bg-gray-100 p-2 rounded transition">
              <span>💰 Payment received</span>
              <span className="text-sm text-gray-400">3 hr ago</span>
            </li>

          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Quick Actions
          </h2>

          <div className="flex flex-col gap-3">

            <button
              onClick={() => navigate("/superadmin/add-admin")}
              className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              ➕ Add Admin
            </button>

            <button className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
              🏏 Add Match
            </button>

            <button className="bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition">
              📊 View Analytics
            </button>

            <button className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
              🚫 Manage Users
            </button>

          </div>
        </div>

      </div>

    </SuperAdminLayout>
  );
};

export default Dashboard;