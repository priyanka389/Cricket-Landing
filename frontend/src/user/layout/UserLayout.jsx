import React from "react";
import UserSidebar from "../components/UserSidebar";
import TopNavbar from "../components/TopNavbar";

const UserLayout = ({ children }) => {
  return (
    <div className="flex bg-[#0f172a] text-white min-h-screen">
      <UserSidebar />
      <div className="flex-1">
        <TopNavbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;