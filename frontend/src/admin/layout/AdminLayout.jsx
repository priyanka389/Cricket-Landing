// admin/layout/AdminLayout.jsx
import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <AdminNavbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;