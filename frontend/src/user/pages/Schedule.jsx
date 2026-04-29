import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLayout from "../layout/UserLayout";
import { useNavigate } from "react-router-dom";
const Schedule = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Live");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/match/all"
      );

      setMatches(res.data.matches);

    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const weekEnd = new Date();
  weekEnd.setDate(today.getDate() + 7);

  const filteredMatches = matches.filter(
    (match) => {
      const matchDate = new Date(match.date);

      if (activeTab === "Live") {
        return match.status === "live";
      }

      if (activeTab === "Today") {
        return (
          matchDate.toDateString() ===
          today.toDateString()
        );
      }

      if (activeTab === "Tomorrow") {
        return (
          matchDate.toDateString() ===
          tomorrow.toDateString()
        );
      }

      if (activeTab === "Week") {
        return (
          matchDate > tomorrow &&
          matchDate <= weekEnd
        );
      }

      return false;
    }
  );

  const addReminder = async (match) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:4000/api/notifications",
        {
          matchId: match._id,
          message: `${match.teamA} vs ${match.teamB} starts at ${match.time} ⏰`
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);

    } catch (error) {
      console.log(error);
    }
  };

  const tabs = [
    "Live",
    "Today",
    "Tomorrow",
    "Week"
  ];

  return (
    <UserLayout>

      <h1 className="text-3xl font-bold mb-6">
        📅 Match Schedule
      </h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab)
            }
            className={`px-5 py-2 rounded-xl font-semibold ${
              activeTab === tab
                ? "bg-green-500"
                : "bg-[#1e293b]"
            }`}
          >
            {tab === "Live"
              ? "🔴 Live"
              : tab}
          </button>
        ))}

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {filteredMatches.length === 0 ? (
          <p>No matches found.</p>
        ) : (
          filteredMatches.map((match) => (
            <div
              key={match._id}
              className="bg-[#1e293b] p-5 rounded-xl"
            >

              <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold">
                  {match.teamA} vs {match.teamB}
                </h2>

                {match.status === "live" && (
                  <span className="text-red-500 animate-pulse">
                    🔴 LIVE
                  </span>
                )}

              </div>

              <p className="text-green-400 mt-2">
                ⏰ {match.time}
              </p>

              <p className="mt-1">
                📍 {match.venue}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {match.type}
              </p>

              {match.status === "live" ? (
                <button
  onClick={() =>
    navigate(`/watch/${match._id}`)
  }
  className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 py-2 rounded-xl font-semibold"
>
  ▶ Watch Live
</button>
              ) : (
                <button
                  onClick={() =>
                    addReminder(match)
                  }
                  className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 rounded-xl font-semibold"
                >
                  🔔 Remind Me
                </button>
              )}

            </div>
          ))
        )}

      </div>

    </UserLayout>
  );
};

export default Schedule;