import React from "react";
import { motion } from "framer-motion";

const LiveScoreCard = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#1e293b] p-5 rounded-xl shadow-md"
    >
      <div className="flex justify-between">
        <span className="text-red-500 animate-pulse">LIVE</span>
        <span>20.3 overs</span>
      </div>

      <h2 className="text-xl font-bold mt-2">
        IND vs AUS
      </h2>

      <p className="text-green-400 mt-1">India: 145/3</p>

      <button className="mt-4 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600">
        Watch Now
      </button>
    </motion.div>
  );
};

export default LiveScoreCard;