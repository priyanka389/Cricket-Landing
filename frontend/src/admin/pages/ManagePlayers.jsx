import React, { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { UserPlus, User, Users, ShieldCheck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManagePlayers = () => {

  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [form, setForm] = useState({
    name: "",
    role: "",
    team: ""
  });

  // 🔥 Load teams
  useEffect(() => {
    fetch("http://localhost:4000/api/team/all")
      .then(res => res.json())
      .then(data => setTeams(data.teams || []))
      .catch(err => console.log(err));
  }, []);

  // 🔥 Load players
  const loadPlayers = () => {
    fetch("http://localhost:4000/api/player/all")
      .then(res => res.json())
      .then(data => setPlayers(data.players || data || []))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const handleAdd = async () => {
    if (!form.name || !form.role || !form.team) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      await fetch("http://localhost:4000/api/player/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      alert("Player saved in DB ✅");

      setForm({ name: "", role: "", team: "" });
      loadPlayers();

    } catch (err) {
      console.log(err);
      alert("Error saving player ❌");
    }
  };

  return (
    <AdminLayout>

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">

        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-3xl font-extrabold flex items-center gap-3 text-gray-800">
          <UserPlus className="text-green-600 animate-bounce" />
          Manage Players
        </h1>

      </div>

      {/* FORM */}
      <div className="max-w-xl mx-auto bg-white border border-gray-200 p-8 rounded-2xl shadow-lg">

        <div className="flex flex-col gap-6">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600">Player Name</label>
            <div className="flex items-center gap-2 border px-3 py-3 rounded-lg bg-white mt-1">
              <User size={16} />
              <input
                placeholder="Enter Player Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full outline-none bg-white text-black placeholder-gray-400"
              />
            </div>
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm text-gray-600">Player Role</label>
            <div className="flex items-center gap-2 border px-3 py-3 rounded-lg bg-white mt-1">
              <ShieldCheck size={16} />
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className={`w-full outline-none bg-white ${
                  form.role ? "text-black" : "text-gray-400"
                }`}
              >
                <option value="">Select Role</option>
                <option>Batsman</option>
                <option>Bowler</option>
                <option>All-rounder</option>
                <option>Wicketkeeper</option>
              </select>
            </div>
          </div>

          {/* TEAM */}
          <div>
            <label className="text-sm text-gray-600">Team</label>
            <div className="flex items-center gap-2 border px-3 py-3 rounded-lg bg-white mt-1">
              <Users size={16} />
              <select
                value={form.team}
                onChange={(e) => setForm({ ...form, team: e.target.value })}
                className={`w-full outline-none bg-white ${
                  form.team ? "text-black" : "text-gray-400"
                }`}
              >
                <option value="">Select Team</option>

                {teams.map(team => (
                  <option key={team._id} value={team.name}>
                    {team.name}
                  </option>
                ))}

              </select>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
          >
            Add Player
          </button>

        </div>
      </div>

      {/* PLAYER LIST */}
      <div className="max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Added Players
        </h2>

        {players.length === 0 ? (
          <p className="text-gray-400 text-sm">No players added yet</p>
        ) : (
          <div className="space-y-3">

            {players.map((p) => (
              <div
                key={p._id}
                className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg"
              >
                <div>
                  <p className="font-medium text-black">{p.name}</p>
                  <p className="text-sm text-gray-500">
                    {p.role} • {p.team}
                  </p>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>

    </AdminLayout>
  );
};

export default ManagePlayers;