import React, { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import {
  Calendar,
  PlusCircle,
  Search,
  Edit,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageMatches = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/match/all")
      .then(res => res.json())
      .then(data => setMatches(data.matches))
      .catch(err => console.log(err));
  }, []);

  // 🔥 REAL TIME UPDATE (important)
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prev => [...prev]);
    }, 60000); // every 1 min

    return () => clearInterval(interval);
  }, []);

  // 🔥 ADVANCED STATUS LOGIC
  const getStatus = (date, time, type) => {
    const now = new Date();
    const start = new Date(`${date}T${time}`);

    // match duration based on type
    let duration = 4; // default (T20)

    if (type === "ODI") duration = 8;
    if (type === "Test") duration = 120; // 5 days = 120 hours

    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    if (now < start) return "Upcoming";
    if (now >= start && now <= end) return "Live";
    return "Completed";
  };

  // 🔥 DELETE FUNCTION (same)
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/match/delete/${id}`, {
        method: "DELETE"
      });

      setMatches(matches.filter(m => m._id !== id));

      alert("Match deleted 🗑️");

    } catch (err) {
      console.log(err);
      alert("Error deleting match ❌");
    }
  };

  const filteredMatches = matches.filter(
    (m) =>
      m.teamA.toLowerCase().includes(search.toLowerCase()) ||
      m.teamB.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="text-blue-600 animate-pulse" />
          Manage Matches
        </h1>

        <button
          onClick={() => navigate("/admin/add-match")}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition shadow-md hover:scale-105"
        >
          <PlusCircle size={18} className="animate-bounce" />
          Add Match
        </button>

      </div>

      {/* Search */}
      <div className="mb-5 relative max-w-md">
        <Search className="absolute left-3 top-3 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search matches..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white text-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white border rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full text-left text-gray-700">

          <thead className="bg-gray-100 text-gray-500 text-sm uppercase">
            <tr>
              <th className="p-4">Teams</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMatches.map((match) => {
             const status = match.status || "upcoming";

              return (
                <tr
                  key={match._id}
                  className="border-t hover:bg-blue-50 transition"
                >
                  <td className="p-4 font-medium">
                    {match.teamA} vs {match.teamB}
                  </td>

                  <td className="p-4">{match.date}</td>

                  <td className="p-4">{match.time}</td>

                  <td className="p-4">
                    <span
  className={`px-3 py-1 rounded-full text-xs font-semibold
    ${
      status === "live"
        ? "bg-yellow-100 text-yellow-700"   // 🔥 LIVE (yellow)
        : status === "upcoming"
        ? "bg-blue-100 text-blue-600"
        : status === "paused"
        ? "bg-orange-100 text-orange-600"
        : status === "completed"
        ? "bg-gray-200 text-gray-600"
        : "bg-gray-200 text-gray-600"
    }
  `}
>
  {status.toUpperCase()}
</span>
                  </td>

                  <td className="p-4 flex justify-center gap-3">

                    <button
                      onClick={() => navigate(`/admin/edit-match/${match._id}`)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(match._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
                    >
                      <Trash2 size={16} />
                    </button>

                    
                    {/* 🔥 ADD THESE */}
  <button
  disabled={status !== "upcoming"}
  onClick={async () => {
    await fetch(`http://localhost:4000/api/match/status/${match._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "live" })
    });

    alert("Match Started ✅");
    window.location.reload();
  }}
  className={`p-2 rounded-lg ${
    status === "upcoming"
      ? "bg-green-100 text-green-600"
      : "bg-gray-200 text-gray-400 cursor-not-allowed"
  }`}
>
  Start
</button>

 <button
  disabled={status !== "live"}
  onClick={async () => {
    await fetch(`http://localhost:4000/api/match/status/${match._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "paused" })
    });

    alert("Match Paused ⏸️");
    window.location.reload();
  }}
  className={`p-2 rounded-lg ${
    status === "live"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-gray-200 text-gray-400 cursor-not-allowed"
  }`}
>
  Pause
</button>

  <button
  disabled={status === "completed"}
  onClick={async () => {
    await fetch(`http://localhost:4000/api/match/status/${match._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" })
    });

    alert("Match Ended 🏁");
    window.location.reload();
  }}
  className={`p-2 rounded-lg ${
    status !== "completed"
      ? "bg-red-100 text-red-600"
      : "bg-gray-200 text-gray-400 cursor-not-allowed"
  }`}
>
  End
</button>
                    

                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>

        {filteredMatches.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            No matches found 😔
          </div>
        )}

      </div>

    </AdminLayout>
  );
};

export default ManageMatches;