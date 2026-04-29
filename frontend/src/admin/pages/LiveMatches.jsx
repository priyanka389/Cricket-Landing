import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { Activity, Radio } from "lucide-react";

const LiveMatches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  useEffect(() => {

  const fetchMatches = () => {
    fetch("http://localhost:4000/api/match/all")
      .then(res => res.json())
      .then(data => setMatches(data.matches))
      .catch(err => console.log(err));
  };

  fetchMatches(); // first load

  const interval = setInterval(fetchMatches, 3000); // 🔁 every 3 sec

  return () => clearInterval(interval);

}, []);
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

  const liveMatches = matches.filter(
  (m) => m.status === "live"
);

  return (
    <AdminLayout>

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-8">
        <Activity className="text-red-500 animate-pulse" />
        <h1 className="text-3xl font-bold text-gray-800">
          Live Matches
        </h1>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-2 gap-6">

        {liveMatches.map((match) => (
          <div
            key={match._id}
            onClick={() => navigate(`/admin/live/${match._id}`)}
            className="bg-gradient-to-br from-white to-red-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer border border-transparent hover:border-red-400"
          >

            {/* TOP */}
            <div className="flex justify-between items-center mb-4">

              {/* LIVE */}
              <div className="flex items-center gap-2 text-red-600 font-semibold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                LIVE
              </div>

              {/* 🔥 MATCH TYPE (FIXED DARK) */}
              <span className="text-xs font-semibold bg-gray-900 text-white px-3 py-1 rounded-full shadow">
                {match.type || "T20"}
              </span>

            </div>

            {/* TEAMS */}
            <h2 className="text-xl font-bold text-gray-800 tracking-wide">
              {match.teamA}
            </h2>

            <p className="text-sm text-gray-400 my-1">vs</p>

            <h2 className="text-xl font-bold text-gray-800 tracking-wide">
              {match.teamB}
            </h2>

            {/* SCORE */}
            <div className="mt-4 text-3xl font-bold text-gray-900">
              {match.score || "—"}
            </div>

            {/* STATUS */}
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <Radio className="text-red-500 animate-pulse" size={14} />
              Live now
            </div>

          </div>
        ))}

      </div>

      {/* EMPTY */}
      {liveMatches.length === 0 && (
        <div className="text-center mt-12 text-gray-400 text-lg">
          No live matches right now 😔
        </div>
      )}

    </AdminLayout>
  );
};

export default LiveMatches;