// admin/pages/Users.jsx
import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import {
  Users as UsersIcon,
  Search,
  UserCheck,
  UserX,
  Trash2
} from "lucide-react";

const Users = () => {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([
    { id: 1, name: "Priya Sharma", email: "priya@gmail.com", status: "Active" },
    { id: 2, name: "Rahul Kumar", email: "rahul@gmail.com", status: "Blocked" },
    { id: 3, name: "Aman Singh", email: "aman@gmail.com", status: "Active" }
  ]);

  // 🔍 Filter
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 🔒 Toggle Block
  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
          : u
      )
    );
  };

  // ❌ Delete
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <AdminLayout>

      {/* 🔷 Header */}
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <UsersIcon className="text-blue-600 animate-pulse" />
          User Management
        </h1>
      </div>

      {/* 🔍 Search */}
      <div className="mb-5 relative max-w-md">
        <Search className="absolute left-3 top-3 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📊 Table */}
      <div className="bg-white border rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full text-left text-gray-700">

          {/* Head */}
          <thead className="bg-gray-100 text-gray-500 text-sm uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-blue-50 transition"
              >
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4">{user.email}</td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-4 flex justify-center gap-3">

                  {/* Toggle Block */}
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={`p-2 rounded-lg transition transform hover:scale-110
                      ${
                        user.status === "Active"
                          ? "bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                          : "bg-green-100 text-green-600 hover:bg-green-600 hover:text-white"
                      }`}
                  >
                    {user.status === "Active" ? (
                      <UserX size={16} className="hover:rotate-12 transition" />
                    ) : (
                      <UserCheck size={16} className="hover:rotate-12 transition" />
                    )}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-black hover:text-white transition transform hover:scale-110"
                  >
                    <Trash2 size={16} className="hover:rotate-12 transition" />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {/* Empty */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            No users found 😔
          </div>
        )}

      </div>

    </AdminLayout>
  );
};

export default Users;