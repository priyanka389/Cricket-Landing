import React, { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import {
  Users,
  Calendar,
  Activity,
  ArrowUpRight,
  Bell,
  PlusCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [liveMatches, setLiveMatches] = useState(0);
  const [completedMatches, setCompletedMatches] = useState(0);

  // 🔥 ACTIVITY STATE
  const [activities, setActivities] = useState([]);

  // 🔥 TIME AGO FUNCTION
  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 60000);
    return `${diff} min ago`;
  };

  // 🔥 STATUS LOGIC
  const getStatus = (date, time, type) => {
    const now = new Date();
    const start = new Date(`${date}T${time}`);

    let duration = 4;
    if (type === "ODI") duration = 8;
    if (type === "Test") duration = 120;

    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    if (now < start) return "Upcoming";
    if (now >= start && now <= end) return "Live";
    return "Completed";
  };

  useEffect(() => {

    // USERS
    fetch("https://cricket-landing.onrender.com/api/user/all")
      .then(res => res.json())
      .then(data => setTotalUsers(data.users.length))
      .catch(err => console.log(err));

    // MATCHES
    fetch("https://cricket-landing.onrender.com/api/match/all")
  .then(res => res.json())
  .then(data => {

    setTotalMatches(data.matches.length);

    const live = data.matches.filter(m => m.status === "live");
    const completed = data.matches.filter(m => m.status === "completed");

    setLiveMatches(live.length);
    setCompletedMatches(completed.length);
  })
      .catch(err => console.log(err));

    // ✅ 🔥 REAL ACTIVITY FROM DB (FIXED)
    fetch("https://cricket-landing.onrender.com/api/activity/all")
      .then(res => res.json())
      .then(data => setActivities(data.activities))
      .catch(err => console.log(err));

  }, []);

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <Users size={24} />,
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Total Matches",
      value: totalMatches,
      icon: <Calendar size={24} />,
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Live Matches",
      value: liveMatches,
      icon: <Activity size={24} />,
      color: "from-green-400 to-green-600"
    },
    {
  title: "Completed Matches",
  value: completedMatches,
  icon: <Activity size={24} />,
  color: "from-gray-400 to-gray-600"
}
  ];

  return (
    <AdminLayout>

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
          <Bell size={18} />
          Notifications
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div key={index} className="rounded-2xl p-1 bg-gradient-to-r shadow-md hover:shadow-xl transition transform hover:-translate-y-2 hover:scale-105 duration-300">
            <div className={`bg-gradient-to-r ${item.color} p-6 rounded-2xl text-white`}>
              
              <div className="flex justify-between items-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  {item.icon}
                </div>
                <ArrowUpRight size={18} />
              </div>

              <p className="text-sm opacity-80">{item.title}</p>
              <h2 className="text-3xl font-bold mt-1">
                {item.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-2 gap-6 mt-10">

        {/* 🔥 REAL ACTIVITY */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Activity
          </h2>

          <ul className="space-y-4 text-gray-600">
            {activities.map((item, index) => (
              <li key={index} className="flex justify-between hover:bg-gray-100 p-2 rounded transition">
                <span>{item.text}</span>
                <span className="text-sm text-gray-400">
                  {timeAgo(item.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* SAME */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Quick Actions
          </h2>

          <div className="flex flex-col gap-3">

            <button
              onClick={() => navigate("/admin/add-match")}
              className="flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <PlusCircle size={18} />
              Add Match
            </button>

            <button className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
              📊 View Reports
            </button>

            <button
              onClick={() => navigate("/admin/users")}
              className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              🚫 Manage Users
            </button>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;