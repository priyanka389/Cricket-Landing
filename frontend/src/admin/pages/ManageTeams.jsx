import React, { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Users, PlusCircle, Trash2, Image } from "lucide-react";

const ManageTeams = () => {

  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [logo, setLogo] = useState(null);

  // ✅ DB से load
  useEffect(() => {
    fetch("http://localhost:4000/api/team/all")
      .then(res => res.json())
      .then(data => setTeams(data.teams))
      .catch(err => console.log(err));
  }, []);

  // 🔥 UPDATED (logo + DB)
  const addTeam = async () => {
    if (!teamName) {
      alert("⚠️ Enter team name");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", teamName);
      formData.append("short", teamName.slice(0, 3).toUpperCase());
      formData.append("logo", logo);

      await fetch("http://localhost:4000/api/team/add", {
        method: "POST",
        body: formData
      });

      alert("Team saved in DB ✅");

      // 🔥 reload data from DB
      const res = await fetch("http://localhost:4000/api/team/all");
      const data = await res.json();
      setTeams(data.teams);

      setTeamName("");
      setLogo(null);

    } catch (err) {
      console.log(err);
      alert("Error saving team ❌");
    }
  };

  const deleteTeam = (id) => {
    setTeams(teams.filter(t => t._id !== id));
  };

  return (
    <AdminLayout>

      <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-gray-800">
        <Users className="text-blue-600 animate-pulse" />
        Manage Teams
      </h1>

      <div className="max-w-xl mx-auto bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-xl mb-8 space-y-5">

        {/* Team Name */}
        <input
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter Team Name"
          className="w-full px-4 py-3 rounded-lg border bg-white text-gray-800"
        />

        {/* Upload + Preview */}
        <div className="flex items-center gap-4">

          <label className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg">
            <Image size={16} />
            Upload Logo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files[0])}
              className="hidden"
            />
          </label>

          {/* ✅ Preview */}
          {logo ? (
            <div className="flex items-center gap-2">
              <img
                src={URL.createObjectURL(logo)}
                alt="preview"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
              />
              <span className="text-sm text-gray-600">Preview</span>
            </div>
          ) : (
            <span className="text-sm text-gray-400 italic">
              No logo selected
            </span>
          )}

        </div>

        {/* Add Button */}
        <button
          onClick={addTeam}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg"
        >
          <PlusCircle size={18} />
          Add Team
        </button>

      </div>

      {/* Team List */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        {teams.length === 0 ? (
          <p>No teams</p>
        ) : (
          teams.map(team => (
            <div key={team._id} className="flex justify-between mb-3">

              <div className="flex items-center gap-3">

                {team.logo ? (
                  <img
                    src={`http://localhost:4000/uploads/${team.logo}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-full">
                    {team.short}
                  </div>
                )}

                <div>
                  <p>{team.name}</p>
                  <p className="text-xs text-gray-400">{team.short}</p>
                </div>
              </div>

              <button onClick={() => deleteTeam(team._id)}>
                <Trash2 />
              </button>

            </div>
          ))
        )}

      </div>

    </AdminLayout>
  );
};

export default ManageTeams;