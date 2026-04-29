import React from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
const LiveMatchCard = ({
  match,
  watchlist,
  toggleWatchlist,
  addReminder
}) => {
  const navigate = useNavigate();
  const isSaved = watchlist.some(
    (item) => item.matchId === String(match.id)
  );

  return (
    <div className="bg-[#1e293b] p-5 rounded-xl relative">

      <button
        onClick={() => toggleWatchlist(match)}
        className="absolute top-4 right-4"
      >
        <Heart
          fill={isSaved ? "red" : "none"}
          color={isSaved ? "red" : "white"}
        />
      </button>

      <span className="text-red-500 animate-pulse">
        🔴 LIVE
      </span>

      <h2 className="text-xl font-bold mt-2">
        {match.teams}
      </h2>

      <p className="mt-2 text-green-400">
        {match.score}
      </p>

      <div className="grid grid-cols-2 gap-3 mt-5">

  <button
  onClick={() =>
    navigate(`/watch/${match.id}`)
  }
  className="bg-green-500 px-4 py-2 mt-4 rounded-lg"
>
  Watch Now
</button>

  <button
    onClick={() => addReminder(match)}
    className="bg-gradient-to-r from-yellow-400 to-orange-500 py-3 rounded-xl font-semibold hover:scale-105 duration-300 shadow-lg"
  >
    🔔 Reminder
  </button>

</div>

    </div>
  );
};

export default LiveMatchCard;