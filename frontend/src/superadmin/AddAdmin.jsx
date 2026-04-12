import React, { useState } from "react";
import SuperAdminLayout from "./SuperAdminLayout";
import { UserPlus, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Admin Created:", form);

    alert("Admin Created Successfully 🎉");

    navigate("/superadmin/admins");
  };

  return (
    <SuperAdminLayout>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">

        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          <UserPlus className="text-purple-600" />
          Add New Admin
        </h1>

      </div>

      {/* Form Card */}
      <div className="max-w-xl mx-auto bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl shadow-xl">

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-3 mt-1 focus-within:ring-2 focus-within:ring-purple-500 transition">
              <User size={16} className="text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email Address</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-3 mt-1 focus-within:ring-2 focus-within:ring-purple-500 transition">
              <Mail size={16} className="text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-3 mt-1 focus-within:ring-2 focus-within:ring-purple-500 transition">
              <Lock size={16} className="text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-purple-100 text-purple-700 text-sm p-3 rounded-lg">
            ℹ️ This admin will have access to manage users, matches, and analytics.
          </div>

          {/* Buttons */}
          <div className="flex gap-3">

            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
            >
              Create Admin 🚀
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </SuperAdminLayout>
  );
};

export default AddAdmin;