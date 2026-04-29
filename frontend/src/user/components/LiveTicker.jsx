import React from "react";

const LiveTicker = () => {
  return (
    <div className="bg-red-600 text-white py-2 px-4 rounded-lg overflow-hidden mb-6">
      <marquee behavior="scroll" direction="left" scrollamount="6">
        🔴 IND 178/4 (18.2) vs AUS | 🔴 CSK 165/3 vs MI | 🔴 ENG 220/6 vs SA
      </marquee>
    </div>
  );
};

export default LiveTicker;