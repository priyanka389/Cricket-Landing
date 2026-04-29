import React, { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Calendar, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddMatch = () => {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);

  const [form, setForm] = useState({
    teamA: "",
    teamB: "",
    date: "",
    time: "",
    venue: "",
    type: "T20",
    category: "IPL"
  });

  useEffect(() => {
    fetch("http://localhost:4000/api/team/all")
      .then((res) => res.json())
      .then((data) => setTeams(data.teams))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.teamA === form.teamB) {
      alert("❌ Team A and Team B cannot be same");
      return;
    }

    try {
      await fetch("http://localhost:4000/api/match/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(form)
      });

      alert("Match Added Successfully ✅");
      navigate("/admin/matches");

    } catch (err) {
      console.log(err);
      alert("Error saving match ❌");
    }
  };

  return (
    <AdminLayout>

      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          <Calendar className="text-blue-600" />
          Add New Match
        </h1>
      </div>

      <div className="max-w-xl mx-auto bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl">

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >

          {/* Team A */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Team A
            </label>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-3 mt-1 bg-white">
              <Users
                size={16}
                className="text-gray-400"
              />

              <select
                name="teamA"
                className="w-full bg-white text-gray-800 outline-none"
                value={form.teamA}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Team A
                </option>

                {teams.map((team) => (
                  <option
                    key={team._id}
                    value={team.name}
                  >
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Team B */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Team B
            </label>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-3 mt-1 bg-white">
              <Users
                size={16}
                className="text-gray-400"
              />

              <select
                name="teamB"
                className="w-full bg-white text-gray-800 outline-none"
                value={form.teamB}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Team B
                </option>

                {teams.map((team) => (
                  <option
                    key={team._id}
                    value={team.name}
                  >
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Match Date */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Match Date
            </label>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Match Time */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Match Time
            </label>

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Venue */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Venue
            </label>

            <input
              type="text"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              placeholder="Enter stadium name"
              className="w-full border border-gray-300 bg-white text-gray-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Match Type */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Match Type
            </label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-gray-800 p-3 rounded-lg outline-none"
            >
              <option value="T20">T20</option>
              <option value="ODI">ODI</option>
              <option value="Test">Test</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white text-gray-800 p-3 rounded-lg outline-none"
            >
              <option value="IPL">IPL</option>
              <option value="International">
                International
              </option>
              <option value="Women">Women</option>
              <option value="Domestic">
                Domestic
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Save Match
          </button>

        </form>
      </div>

    </AdminLayout>
  );
};

export default AddMatch;