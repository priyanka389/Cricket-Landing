import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import {
  Calendar,
  Save,
  ArrowLeft,
  Users,
  Clock,
  MapPin
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const EditMatch = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    teamA: "",
    teamB: "",
    date: "",
    time: "",
    venue: "",
    type: ""
  });

  const [teams, setTeams] = useState([]);

  // 🔥 load teams
  useEffect(() => {
    fetch("http://localhost:4000/api/team/all")
      .then(res => res.json())
      .then(data => setTeams(data.teams));
  }, []);

  // 🔥 load match data
  useEffect(() => {
    fetch(`http://localhost:4000/api/match/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 UPDATE MATCH
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:4000/api/match/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      alert("Match Updated ✅");
      navigate("/admin/matches");

    } catch (err) {
      console.log(err);
      alert("Error updating ❌");
    }
  };

  return (
    <AdminLayout>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          <Calendar className="text-blue-600 animate-pulse" />
          Edit Match
        </h1>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl">

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Team A */}
          <div>
            <label className="text-sm text-gray-600">Team A</label>
            <select
              name="teamA"
              value={form.teamA}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-white text-gray-800"
            >
              {teams.map(t => (
                <option key={t._id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Team B */}
          <div>
            <label className="text-sm text-gray-600">Team B</label>
            <select
              name="teamB"
              value={form.teamB}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border bg-white text-gray-800"
            >
              {teams.map(t => (
                <option key={t._id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-3 border rounded bg-white text-gray-800"
          />

          {/* Time */}
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="p-3 border rounded bg-white text-gray-800"
          />

          {/* Venue */}
          <input
            type="text"
            name="venue"
            value={form.venue}
            onChange={handleChange}
            className="p-3 border rounded bg-white text-gray-800"
            placeholder="Venue"
          />

          {/* Type */}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="p-3 border rounded bg-white text-gray-800"
          >
            <option>T20</option>
            <option>ODI</option>
            <option>Test</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition hover:scale-105"
          >
            <Save size={18} />
            Update Match
          </button>

        </form>

      </div>

    </AdminLayout>
  );
};

export default EditMatch;