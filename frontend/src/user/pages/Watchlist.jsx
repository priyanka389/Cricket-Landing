import React, { useEffect, useState } from "react";
import UserLayout from "../layout/UserLayout";
import axios from "axios";

const Watchlist = () => {
  const [savedMatches, setSavedMatches] = useState([]);

  useEffect(() => {
    fetchWatchlist();
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

      setSavedMatches(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserLayout>

      <h1 className="text-3xl font-bold mb-6">
        ❤️ My Watchlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {savedMatches.length === 0 ? (
          <p>No matches saved.</p>
        ) : (
          savedMatches.map((match) => (
            <div
              key={match._id}
              className="bg-[#1e293b] p-5 rounded-xl"
            >
              <h2 className="text-xl font-bold">
                {match.teams}
              </h2>

              <p className="text-green-400 mt-2">
                {match.score}
              </p>
            </div>
          ))
        )}

      </div>

    </UserLayout>
  );
};

export default Watchlist;