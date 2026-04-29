import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { Activity, ArrowLeft, MapPin, Clock, Settings } from "lucide-react";

const LiveControlPanel = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

 useEffect(() => {

  const fetchMatches = () => {
    fetch("http://localhost:4000/api/match/all")
      .then(res => res.json())
      .then(data => setMatches(data.matches));
  };

  fetchMatches();

  const interval = setInterval(fetchMatches, 3000);

  return () => clearInterval(interval);

}, []);
  // const getStatus = (date, time) => {
  //   const now = new Date();
  //   const start = new Date(`${date}T${time}`);
  //   const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);

  //   if (now >= start && now <= end) return "Live";
  //   return "Other";
  // };

  // const liveMatches = matches.filter(
  //   (m) => getStatus(m.date, m.time) === "Live"
  // );

  const liveMatches = matches.filter(
  (m) => m.status === "live"
);

  return (
    <AdminLayout>

      {/* 🔷 Header with Back */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            <ArrowLeft size={18} />
          </button>

          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
            <Activity className="text-red-500 animate-pulse" />
            Live Control Panel
          </h1>
        </div>

        <span className="text-sm text-gray-500">
          Select a live match to manage scoring
        </span>

      </div>

      {/* 🔴 Live Matches Grid */}
      <div className="grid grid-cols-2 gap-6">

        {liveMatches.map((match) => (
          <div
            key={match._id}
            onClick={() => {
  if (match.status !== "live") {
    alert("Match is not live ❌");
    return;
  }

  navigate(`/admin/live-control/${match._id}`);
}}
            className="group bg-gradient-to-br from-white to-red-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition transform hover:-translate-y-1 hover:scale-[1.02] border border-transparent hover:border-red-400"
          >

            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-3">

              {/* LIVE badge */}
              <div className="flex items-center gap-2 text-red-600 font-semibold text-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                LIVE
              </div>

              {/* Match Type */}
              <span className="text-xs bg-gray-900 text-white px-3 py-1 rounded-full">
                {match.type || "T20"}
              </span>

            </div>

            {/* TEAMS */}
            <h2 className="text-xl font-bold text-gray-800">
              {match.teamA}
            </h2>

            <p className="text-gray-400 text-sm my-1">vs</p>

            <h2 className="text-xl font-bold text-gray-800">
              {match.teamB}
            </h2>

            {/* SCORE */}
            <div className="mt-3 text-2xl font-bold text-gray-900">
              {match.score || "Live scoring..."}
            </div>

            {/* META */}
            <div className="mt-3 text-xs text-gray-500 space-y-1">
              <div className="flex items-center gap-2">
                <Clock size={12} />
                {match.date} | {match.time}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={12} />
                {match.venue || "Unknown Stadium"}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-4 flex items-center justify-between">

              <span className="text-sm text-gray-600">
                Manage live scoring & events
              </span>

              <button
                className="flex items-center gap-2 text-sm bg-red-500 text-white px-3 py-1.5 rounded-lg shadow group-hover:bg-red-600 transition"
              >
                <Settings size={14} />
                Open Control
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {liveMatches.length === 0 && (
        <div className="text-center mt-16 text-gray-400">
          <Activity size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-lg">No live matches right now</p>
          <p className="text-sm mt-1">
            Start a match or wait until a scheduled match goes live
          </p>
        </div>
      )}

    </AdminLayout>
  );
};

export default LiveControlPanel;