import React from "react";

const TrendingPlayers = () => {
  const players = ["Virat Kohli", "Rohit Sharma", "MS Dhoni"];

  return (
    <div className="bg-[#1e293b] p-5 rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        🔥 Trending Players
      </h2>

      <div className="space-y-3">
        {players.map((player, i) => (
          <div
            key={i}
            className="bg-[#334155] p-3 rounded-lg"
          >
            {player}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPlayers;