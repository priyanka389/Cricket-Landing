import React from "react";
import UserLayout from "../layout/UserLayout";

const StadiumTickets = () => {
  const tickets = [
    {
      id: 1,
      match: "IND vs AUS",
      stadium: "Wankhede Stadium",
      city: "Mumbai",
      price: "₹999",
      seat: "General"
    },

    {
      id: 2,
      match: "CSK vs MI",
      stadium: "Chepauk Stadium",
      city: "Chennai",
      price: "₹1499",
      seat: "Premium"
    },

    {
      id: 3,
      match: "ENG vs SA",
      stadium: "Lords",
      city: "London",
      price: "₹1999",
      seat: "VIP"
    }
  ];

  return (
    <UserLayout>

      <h1 className="text-3xl font-bold mb-8">
        🎟 Stadium Tickets
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-[#1e293b] p-6 rounded-2xl hover:scale-105 duration-300"
          >

            <h2 className="text-2xl font-bold">
              {ticket.match}
            </h2>

            <p className="mt-3 text-green-400">
              📍 {ticket.stadium}
            </p>

            <p className="mt-2">
              🌆 {ticket.city}
            </p>

            <p className="mt-2">
              💺 {ticket.seat}
            </p>

            <p className="mt-3 text-2xl font-bold text-yellow-400">
              {ticket.price}
            </p>

            <button className="mt-5 w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl font-semibold">
              🎟 Book Now
            </button>

          </div>
        ))}

      </div>

    </UserLayout>
  );
};

export default StadiumTickets;