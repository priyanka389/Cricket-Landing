import React, { useState } from "react";
import SuperAdminLayout from "./SuperAdminLayout";
import { Search, Ban, CheckCircle, Users } from "lucide-react";

const UserManagement = () => {

  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([
    { id: 1, name: "Aman", email: "aman@gmail.com", banned: false },
    { id: 2, name: "Riya", email: "riya@gmail.com", banned: true },
    { id: 3, name: "Rahul", email: "rahul@gmail.com", banned: false },
    { id: 4, name: "Priya", email: "priya@gmail.com", banned: false },
  ]);

  const toggleBan = (id) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, banned: !u.banned } : u
    ));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Stats Logic
  const totalUsers = users.length;
  const activeUsers = users.filter(u => !u.banned).length;
  const bannedUsers = users.filter(u => u.banned).length;

  return (
    <SuperAdminLayout>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-blue-600" />
        <h1 className="text-3xl font-extrabold text-gray-800">
          User Management
        </h1>
      </div>

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        {/* Total Users */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center">
          <div>
            <p className="text-blue-700 text-sm font-medium">Total Users</p>
            <h2 className="text-3xl font-extrabold text-blue-900">
              {totalUsers}
            </h2>
          </div>
          <div className="bg-blue-500 text-white p-3 rounded-full">
            <Users size={20} />
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-green-700 text-sm font-medium">Active Users</p>
            <h2 className="text-3xl font-extrabold text-green-800">
              {activeUsers}
            </h2>
          </div>
          <div className="bg-green-500 text-white p-3 rounded-full">
            <CheckCircle size={20} />
          </div>
        </div>

        {/* Banned Users */}
        <div className="bg-gradient-to-r from-red-100 to-red-200 p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-red-700 text-sm font-medium">Banned Users</p>
            <h2 className="text-3xl font-extrabold text-red-800">
              {bannedUsers}
            </h2>
          </div>
          <div className="bg-red-500 text-white p-3 rounded-full">
            <Ban size={20} />
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="mb-5 flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow focus-within:ring-2 focus-within:ring-blue-500">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full outline-none text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  {/* Name */}
                  <td className="p-4 font-medium text-gray-800">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="text-gray-500">
                    {user.email}
                  </td>

                  {/* Status */}
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${user.banned
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                      }`}>
                      {user.banned ? "Banned" : "Active"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="text-center">

                    <button
                      onClick={() => toggleBan(user.id)}
                      className={`px-4 py-1.5 rounded-lg text-white text-sm flex items-center gap-1 inline-flex transition
                      ${user.banned
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {user.banned ? <CheckCircle size={14} /> : <Ban size={14} />}
                      {user.banned ? "Unban" : "Ban"}
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400">
                  No users found 😔
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </SuperAdminLayout>
  );
};

export default UserManagement;