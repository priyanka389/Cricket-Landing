import React, { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Users, Calendar, Crown, Star, Edit } from "lucide-react";

const ManageSquad = () => {

  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [squads, setSquads] = useState([]);

  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const [captain, setCaptain] = useState("");
  const [viceCaptain, setViceCaptain] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {

    fetch("http://localhost:4000/api/match/all")
      .then(res => res.json())
      .then(data => setMatches(data.matches || []));

    fetch("http://localhost:4000/api/team/all")
      .then(res => res.json())
      .then(data => setTeams(data.teams || []));

    fetch("http://localhost:4000/api/player/all")
      .then(res => res.json())
      .then(data => setPlayers(data.players || []));

    loadSquads();

  }, []);

  const loadSquads = () => {
    fetch("http://localhost:4000/api/squad/all")
      .then(res => res.json())
      .then(data => setSquads(data.squads || []));
  };

  const teamPlayers = players.filter(p => p.team === selectedTeam);

  const togglePlayer = (id) => {

    if (selectedPlayers.includes(id)) {
      setSelectedPlayers(selectedPlayers.filter(p => p !== id));

      if (captain === id) setCaptain("");
      if (viceCaptain === id) setViceCaptain("");

    } else {

      if (selectedPlayers.length >= 11) {
        alert("⚠️ Only 11 players allowed");
        return;
      }

      setSelectedPlayers([...selectedPlayers, id]);
    }
  };

  const handleSave = async () => {
    const matchObj = matches.find(m => m._id === selectedMatch);

if (matchObj?.status === "live") {
  alert("Match started! Cannot edit squad ❌");
  return;
}
    if (!selectedMatch || !selectedTeam || selectedPlayers.length === 0 || !captain) {
      alert("⚠️ Complete all fields");
      return;
    }

    const url = editId
      ? `http://localhost:4000/api/squad/update/${editId}`
      : "http://localhost:4000/api/squad/add";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        matchId: selectedMatch,
        team: selectedTeam,
        players: selectedPlayers,
        captain,
        viceCaptain
      })
    });

    alert(editId ? "Updated ✅" : "Squad Saved ✅");

    setSelectedPlayers([]);
    setCaptain("");
    setViceCaptain("");
    setSelectedTeam("");
    setSelectedMatch("");
    setEditId(null);

    loadSquads();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/squad/delete/${id}`, {
      method: "DELETE"
    });

    loadSquads();
  };

  const handleEdit = (s) => {
    setEditId(s._id);
    setSelectedMatch(s.matchId);
    setSelectedTeam(s.team);
    setSelectedPlayers(s.players);
    setCaptain(s.captain);
    setViceCaptain(s.viceCaptain);
  };

  return (
    <AdminLayout>

      <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-gray-800">
        <Users className="text-purple-600 animate-bounce" />
        Manage Squad
      </h1>

      {/* FORM */}
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl shadow-xl space-y-6">

        {/* MATCH */}
        <div>
          <label className="text-sm text-gray-600">Select Match</label>
          <div className="flex items-center gap-2 border px-3 py-3 rounded-lg mt-1 bg-white">
            <Calendar size={16} />
            <select
              value={selectedMatch}
              onChange={(e) => setSelectedMatch(e.target.value)}
              className={`w-full outline-none bg-white ${
                selectedMatch ? "text-black" : "text-gray-400"
              }`}
            >
              <option value="">Select Match</option>
              {matches.map(m => (
                <option key={m._id} value={m._id}>
                  {m.teamA} vs {m.teamB} ({m.date})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TEAM */}
        <div>
          <label className="text-sm text-gray-600">Select Team</label>
          <div className="flex items-center gap-2 border px-3 py-3 rounded-lg mt-1 bg-white">
            <Users size={16} />
            <select
              value={selectedTeam}
              onChange={(e) => {
                setSelectedTeam(e.target.value);
                setSelectedPlayers([]);
                setCaptain("");
                setViceCaptain("");
              }}
              className={`w-full outline-none bg-white ${
                selectedTeam ? "text-black" : "text-gray-400"
              }`}
            >
              <option value="">Select Team</option>
              {teams.map(t => (
                <option key={t._id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* PLAYERS */}
        <div>
          <div className="flex justify-between">
            <label className="text-sm text-gray-600">Select Players</label>
            <span className="text-purple-600 font-semibold">
              {selectedPlayers.length}/11
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            {teamPlayers.map(player => (
              <div
                key={player._id}
                onClick={() => togglePlayer(player._id)}
                className={`p-3 rounded-lg border cursor-pointer transition
                  ${selectedPlayers.includes(player._id)
                    ? "bg-purple-100 border-purple-500"
                    : "bg-white hover:bg-gray-100"}
                `}
              >
                {player.name}
              </div>
            ))}
          </div>
        </div>

        {/* CAPTAIN */}
        {selectedPlayers.length > 0 && (
          <>
            <div>
              <label className="text-sm flex items-center gap-2">
                <Crown className="text-yellow-500" size={16} />
                Captain
              </label>

              <select
                value={captain}
                onChange={(e) => setCaptain(e.target.value)}
                className="w-full border px-4 py-3 rounded-lg mt-2 bg-white text-black"
              >
                <option value="">Select Captain</option>
                {selectedPlayers.map(id => {
                  const p = players.find(x => x._id === id);
                  return <option key={id} value={id}>{p?.name}</option>;
                })}
              </select>
            </div>

            <div>
              <label className="text-sm flex items-center gap-2">
                <Star className="text-blue-500" size={16} />
                Vice Captain
              </label>

              <select
                value={viceCaptain}
                onChange={(e) => setViceCaptain(e.target.value)}
                className="w-full border px-4 py-3 rounded-lg mt-2 bg-white text-black"
              >
                <option value="">Select Vice Captain</option>
                {selectedPlayers.map(id => {
                  const p = players.find(x => x._id === id);
                  return <option key={id} value={id}>{p?.name}</option>;
                })}
              </select>
            </div>
          </>
        )}

        <button
          onClick={handleSave}
          className="w-full bg-purple-600 text-white py-3 rounded-lg"
        >
          {editId ? "Update Squad" : "Save Squad"}
        </button>

      </div>

      {/* SAVED */}
      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">

        <h2 className="text-lg font-bold mb-4 text-gray-700">
          Saved Squads
        </h2>

        {squads.length === 0 ? (
          <p className="text-gray-400">No squads yet</p>
        ) : (
          squads.map(s => {
            console.log("SQUAD:", s);
  console.log("CAPTAIN:", s.captain);
  console.log("PLAYERS:", players);

            const match = matches.find(m => m._id === s.matchId);

            return (
              <div key={s._id} className="border p-4 rounded-lg mb-3 bg-gray-50">

                {/* MATCH + DATE */}
                <p className="font-semibold text-gray-800">
                  {match?.teamA} vs {match?.teamB} ({match?.date})
                </p>

                {/* TEAM */}
                <p className="font-semibold text-purple-700">
                  {s.team}
                </p>

                <p className="text-sm text-gray-500">
                  Players: {s.players.length}
                </p>

       <p className="text-sm">
  <span className="font-bold text-gray-900">👑 Captain:</span>{" "}
  <span className="text-gray-500">
    {players.filter(p => String(p._id) === String(s.captain))[0]?.name || "N/A"}
  </span>
</p>

<p className="text-sm">
  <span className="font-bold text-gray-900">⭐ Vice Captain:</span>{" "}
  <span className="text-gray-500">
    {players.filter(p => String(p._id) === String(s.viceCaptain))[0]?.name || "N/A"}
  </span>
</p>
                <div className="flex gap-2 mt-2">

                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    <Edit size={14} />
                  </button>

                  <button
                    onClick={() => handleDelete(s._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>
            );
          })
        )}

      </div>

    </AdminLayout>
  );
};

export default ManageSquad;