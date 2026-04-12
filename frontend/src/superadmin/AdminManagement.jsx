import React, { useState } from "react";
import SuperAdminLayout from "./SuperAdminLayout";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  UserPlus,
  Trash2,
  Power,
  Search,
  CheckCircle,
  Ban
} from "lucide-react";

const AdminManagement = () => {
    const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [admins, setAdmins] = useState([
    { id: 1, name: "Rahul", email: "rahul@gmail.com", active: true },
    { id: 2, name: "Neha", email: "neha@gmail.com", active: false },
    { id: 3, name: "Amit", email: "amit@gmail.com", active: true },
  ]);

  // Toggle Active/Inactive
  const toggleStatus = (id) => {
    setAdmins(admins.map(a =>
      a.id === id ? { ...a, active: !a.active } : a
    ));
  };

  // Delete Admin
  const deleteAdmin = (id) => {
    setAdmins(admins.filter(a => a.id !== id));
  };

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const totalAdmins = admins.length;
  const activeAdmins = admins.filter(a => a.active).length;
  const inactiveAdmins = admins.filter(a => !a.active).length;

  return (
    <SuperAdminLayout>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Shield className="text-purple-600" />
          <h1 className="text-3xl font-extrabold text-gray-800">
            Admin Management
          </h1>
        </div>

        <button
  onClick={() => navigate("/superadmin/add-admin")}
  className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition shadow"
>
  <UserPlus size={18} />
  Add Admin
</button>
      </div>

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        {/* Total */}
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-purple-700 text-sm">Total Admins</p>
            <h2 className="text-3xl font-bold">{totalAdmins}</h2>
          </div>
          <Shield />
        </div>

        {/* Active */}
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-green-700 text-sm">Active</p>
            <h2 className="text-3xl font-bold text-green-800">{activeAdmins}</h2>
          </div>
          <div className="bg-green-500 text-white p-3 rounded-full">
            <CheckCircle size={18} />
          </div>
        </div>

        {/* Inactive */}
        <div className="bg-gradient-to-r from-red-100 to-red-200 p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-red-700 text-sm">Inactive</p>
            <h2 className="text-3xl font-bold text-red-800">{inactiveAdmins}</h2>
          </div>
          <div className="bg-red-500 text-white p-3 rounded-full">
            <Ban size={18} />
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="mb-5 flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search admins..."
          className="w-full outline-none"
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

            {filteredAdmins.length > 0 ? (
              filteredAdmins.map(admin => (
                <tr key={admin.id} className="border-t hover:bg-gray-50 transition">

                  <td className="p-4 font-medium">{admin.name}</td>
                  <td className="text-gray-500">{admin.email}</td>

                  {/* Status with Icon */}
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit
                      ${admin.active
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                      }`}>
                      {admin.active ? <CheckCircle size={12} /> : <Ban size={12} />}
                      {admin.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="text-center flex justify-center gap-2">

                    {/* Activate / Deactivate */}
                    <button
                      onClick={() => toggleStatus(admin.id)}
                      className={`px-3 py-1 rounded text-white text-sm flex items-center gap-1
                      ${admin.active
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      <Power size={14} />
                      {admin.active ? "Deactivate" : "Activate"}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteAdmin(admin.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm flex items-center gap-1 hover:bg-red-600"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-400">
                  No admins found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </SuperAdminLayout>
  );
};

export default AdminManagement;