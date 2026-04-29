// src/user/pages/UserDashboard.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

import UserLayout from "../layout/UserLayout";
import StatCard from "../components/StatCard";
import LiveMatchCard from "../components/LiveMatchCard";

import LiveTicker from "../components/LiveTicker";
import PollCard from "../components/PollCard";
import ChatSection from "../components/ChatSection";
import TrendingPlayers from "../components/TrendingPlayers";

const UserDashboard = () => {
  const lang =
JSON.parse(localStorage.getItem("userSettings"))?.language || "English";
  const settings =
JSON.parse(localStorage.getItem("userSettings"));

const notificationsEnabled =
settings?.notifications ?? true;
  const [matches, setMatches] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [upcomingCount, setUpcomingCount] = useState(0);

  useEffect(() => {
  fetchWatchlist();
  fetchLiveMatches();
  fetchNotifications();
  fetchUpcomingMatches();

  const interval = setInterval(() => {
    fetchLiveMatches();
    fetchUpcomingMatches();
  }, 5000);

  return () => clearInterval(interval);

}, []);

  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:4000/api/watchlist",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setWatchlist(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotifications = async () => {
  const settings =
    JSON.parse(
      localStorage.getItem("userSettings")
    );

  const notificationsEnabled =
    settings?.notifications ?? true;

  if (!notificationsEnabled) {
    setNotifications([]);
    return;
  }

  try {
    const token =
      localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:4000/api/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setNotifications(res.data);

  } catch (error) {
    console.log(error);
  }
};

  const fetchUpcomingMatches = async () => {
  try {
    const res = await axios.get(
      "http://localhost:4000/api/match/all"
    );

    const upcoming = res.data.matches.filter(
      (item) =>
        item.status?.toLowerCase() ===
        "upcoming"
    );

    setUpcomingCount(upcoming.length);

  } catch (error) {
    console.log(error);
  }
};

  const toggleWatchlist = async (match) => {
    try {
      const token = localStorage.getItem("token");

      const exists = watchlist.find(
        (item) =>
          item.matchId ===
          String(match._id || match.id)
      );

      if (exists) {
        await axios.delete(
          `http://localhost:4000/api/watchlist/${exists._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        await axios.post(
          "http://localhost:4000/api/watchlist",
          {
            matchId: match._id || match.id,
            teams:
              match.teams ||
              `${match.teamA} vs ${match.teamB}`,
            score:
              match.scoreText ||
              `${match.score}/${match.wickets} (${match.balls})`
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      fetchWatchlist();

    } catch (error) {
      console.log(error);
    }
  };

  const fetchLiveMatches = async () => {
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

  const addReminder = async (match) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:4000/api/notifications",
        {
          matchId: match._id || match.id,
          message: `${
            match.teams ||
            `${match.teamA} vs ${match.teamB}`
          } starts at ${match.time} today ⏰`
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);
      fetchNotifications();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserLayout>
      <div className="bg-gradient-to-r from-green-500 to-yellow-500 p-6 rounded-xl mb-6">
        <h1 className="text-3xl font-bold">
          Hey Priyanka 👋
        </h1>
        <p>Ready for today's cricket action?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Live Matches"
          value={matches.length}
        />

        <StatCard
  title="Upcoming"
  value={upcomingCount}
/>

        <StatCard
          title="Favorites"
          value={watchlist.length}
        />

        <StatCard
          title="Alerts"
          value={notifications.length}
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">
        🔴 Live Matches
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {matches.map((match) => (
          <LiveMatchCard
            key={match._id}
            match={{
              id: match._id,
              teams: `${match.teamA} vs ${match.teamB}`,
              score: `${match.score}/${match.wickets} (${match.balls})`,
              time: match.time
            }}
            watchlist={watchlist}
            toggleWatchlist={toggleWatchlist}
            addReminder={addReminder}
          />
        ))}
      </div>

      <div className="mt-8">
        <LiveTicker />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <PollCard />
        <ChatSection />
        <TrendingPlayers />
      </div>
    </UserLayout>
  );
};

export default UserDashboard;