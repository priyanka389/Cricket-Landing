import React from "react";
import SuperAdminLayout from "./SuperAdminLayout";
import {
  Users,
  TrendingUp,
  BarChart3,
  Activity
} from "lucide-react";

const Analytics = () => {
  return (
    <SuperAdminLayout>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="text-blue-600" />
        <h1 className="text-3xl font-extrabold text-gray-800">
          Analytics Dashboard
        </h1>
      </div>

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        {/* Active Users */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-xl shadow flex justify-between items-center hover:scale-105 transition">
          <div>
            <p className="text-blue-700 text-sm">Active Users</p>
            <h2 className="text-3xl font-bold text-blue-900">800</h2>
            <p className="text-green-600 text-xs mt-1">+12% this week</p>
          </div>
          <div className="bg-blue-500 text-white p-3 rounded-full">
            <Users size={20} />
          </div>
        </div>

        {/* Traffic */}
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-xl shadow flex justify-between items-center hover:scale-105 transition">
          <div>
            <p className="text-green-700 text-sm">Daily Traffic</p>
            <h2 className="text-3xl font-bold text-green-900">12K</h2>
            <p className="text-green-600 text-xs mt-1">+8% increase</p>
          </div>
          <div className="bg-green-500 text-white p-3 rounded-full">
            <Activity size={20} />
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-6 rounded-xl shadow flex justify-between items-center hover:scale-105 transition">
          <div>
            <p className="text-purple-700 text-sm">Revenue Growth</p>
            <h2 className="text-3xl font-bold text-purple-900">+18%</h2>
            <p className="text-green-600 text-xs mt-1">This month</p>
          </div>
          <div className="bg-purple-500 text-white p-3 rounded-full">
            <TrendingUp size={20} />
          </div>
        </div>

      </div>

      {/* 📊 Graph Section (Dummy UI) */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          User Growth Overview
        </h2>

        <div className="h-40 flex items-end gap-4">
          {/* Dummy bars */}
          {[40, 60, 80, 50, 90, 70].map((value, i) => (
            <div
              key={i}
              className="flex-1 bg-blue-400 rounded-t-lg transition-all duration-500 hover:bg-blue-600"
              style={{ height: `${value}%` }}
            ></div>
          ))}
        </div>
      </div>

      {/* 📌 Insights Section */}
      <div className="grid grid-cols-2 gap-6">

        {/* Top Performing */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Top Insights
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li>🔥 Peak traffic at 8 PM</li>
            <li>👤 200 new users this week</li>
            <li>📈 Revenue increased by 18%</li>
            <li>⚡ Most active match: IND vs AUS</li>
          </ul>
        </div>

        {/* Performance */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Performance
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li>✔ Server uptime: 99.9%</li>
            <li>⚡ Response time: 120ms</li>
            <li>📊 Conversion rate: 4.5%</li>
            <li>💰 Avg revenue per user: ₹120</li>
          </ul>
        </div>

      </div>

    </SuperAdminLayout>
  );
};

export default Analytics;