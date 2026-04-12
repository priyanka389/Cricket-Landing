import React from "react";
import Sidebar from "../superadmin/Sidebar";
import Topbar from "../superadmin/Topbar";

const SuperAdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-[Poppins]">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;