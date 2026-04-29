import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLayout from "../layout/UserLayout";
import { useNavigate } from "react-router-dom";

const UserLiveMatches = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/match/all"
      );

      const live = res.data.matches.filter(
  (item) =>
    item.status?.toLowerCase() === "live"
);

      setMatches(live);

    } catch (error) {
      console.log(error);
    }
  };

  const filtered =
    activeTab === "All"
      ? matches
      : matches.filter(
          (match) =>
            match.category === activeTab
        );

  return (
    <UserLayout>

      <h1 className="text-3xl font-bold mb-6">
        🔴 Live Matches
      </h1>

      <div className="flex gap-3 mb-6 flex-wrap">

        {[
          "All",
          "IPL",
          "International",
          "Women"
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl font-semibold ${
              activeTab === tab
                ? "bg-green-500"
                : "bg-[#1e293b]"
            }`}
          >
            {tab}
          </button>
        ))}

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {filtered.map((match) => (
          <div
            key={match._id}
            className="bg-[#1e293b] p-5 rounded-2xl"
          >

            <div className="flex justify-between">

              <span className="text-red-500 animate-pulse">
                🔴 LIVE
              </span>

              <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                HD
              </span>

            </div>

            <h2 className="text-2xl font-bold mt-4">
              {match.teamA} vs {match.teamB}
            </h2>

            <p className="text-green-400 mt-2">
              {match.score}/{match.wickets} ({match.balls})
            </p>

            <p className="text-sm text-gray-300 mt-2">
              👀 Live Watching
            </p>

            <button
  onClick={() =>
    navigate(`/watch/${match._id}`)
  }
  className="mt-5 w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl font-semibold"
>
  ▶ Watch
</button>

          </div>
        ))}

      </div>

    </UserLayout>
  );
};

export default UserLiveMatches;