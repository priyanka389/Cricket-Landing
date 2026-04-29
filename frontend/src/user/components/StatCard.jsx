import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-[#1e293b] p-5 rounded-xl text-center hover:scale-105 duration-300">
      <h3>{title}</h3>
      <p className="text-2xl text-green-400 mt-2">{value}</p>
    </div>
  );
};

export default StatCard;