import React from "react";
import { Edit, Trash } from "lucide-react";

const MatchCard = ({ match }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center">

      {/* Left */}
      <div>
        <h2 className="font-semibold text-lg">
          {match.teamA} vs {match.teamB}
        </h2>

        <p className="text-sm text-gray-500">
          {match.date} • {match.venue}
        </p>

        <span className={`text-xs mt-2 inline-block px-2 py-1 rounded 
          ${match.status === "Live" ? "bg-red-100 text-red-600" :
            match.status === "Upcoming" ? "bg-yellow-100 text-yellow-600" :
            "bg-green-100 text-green-600"}`}>
          {match.status}
        </span>
      </div>

      {/* Right actions */}
      <div className="flex gap-3">
        <button className="p-2 bg-blue-100 rounded hover:bg-blue-200">
          <Edit size={16} />
        </button>

        <button className="p-2 bg-red-100 rounded hover:bg-red-200">
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default MatchCard;