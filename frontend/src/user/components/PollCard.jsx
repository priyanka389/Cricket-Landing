import React, { useState } from "react";

const PollCard = () => {
  const [vote, setVote] = useState("");

  return (
    <div className="bg-[#1e293b] p-5 rounded-xl">
      <h2 className="text-xl font-bold mb-4">
        🗳 Who will win today?
      </h2>

      <div className="space-y-2">
        <button
          onClick={() => setVote("India")}
          className="w-full bg-blue-500 py-2 rounded-lg"
        >
          India
        </button>

        <button
          onClick={() => setVote("Australia")}
          className="w-full bg-yellow-500 py-2 rounded-lg"
        >
          Australia
        </button>
      </div>

      {vote && (
        <p className="mt-4 text-green-400">
          You voted for {vote}
        </p>
      )}
    </div>
  );
};

export default PollCard;