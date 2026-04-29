import React, { useState } from "react";
import UserLayout from "../layout/UserLayout";

const FantasyZone = () => {
  const players = [
    "Virat Kohli",
    "Rohit Sharma",
    "MS Dhoni",
    "Hardik Pandya",
    "Jasprit Bumrah",
    "KL Rahul"
  ];

  const [captain, setCaptain] = useState("");
  const [viceCaptain, setViceCaptain] = useState("");

  return (
    <UserLayout>

      <h1 className="text-3xl font-bold mb-8">
        🏏 Fantasy Zone
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Team Selection */}
        <div className="lg:col-span-2 bg-[#1e293b] p-6 rounded-2xl">

          <h2 className="text-2xl font-bold mb-5">
            Create Your Team
          </h2>

          <div className="space-y-4">

            {players.map((player, i) => (
              <div
                key={i}
                className="bg-[#334155] p-4 rounded-xl flex justify-between items-center"
              >

                <span>{player}</span>

                <div className="flex gap-2">

                  <button
                    onClick={() => setCaptain(player)}
                    className="bg-green-500 px-3 py-1 rounded-lg text-sm"
                  >
                    C
                  </button>

                  <button
                    onClick={() => setViceCaptain(player)}
                    className="bg-yellow-500 px-3 py-1 rounded-lg text-sm"
                  >
                    VC
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Right Side */}
        <div className="bg-[#1e293b] p-6 rounded-2xl">

          <h2 className="text-2xl font-bold mb-5">
            Team Summary
          </h2>

          <p className="mb-3">
            👑 Captain: {captain || "Not Selected"}
          </p>

          <p className="mb-5">
            ⭐ Vice Captain: {viceCaptain || "Not Selected"}
          </p>

          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl font-semibold">
            Join Contest ₹49
          </button>

          <h3 className="text-xl font-bold mt-8 mb-4">
            🏆 Leaderboard
          </h3>

          <div className="space-y-3">

            <div className="bg-[#334155] p-3 rounded-lg">
              1. Rahul - 780 pts
            </div>

            <div className="bg-[#334155] p-3 rounded-lg">
              2. Priyanka - 745 pts
            </div>

            <div className="bg-[#334155] p-3 rounded-lg">
              3. Aman - 710 pts
            </div>

          </div>

        </div>

      </div>

    </UserLayout>
  );
};

export default FantasyZone;