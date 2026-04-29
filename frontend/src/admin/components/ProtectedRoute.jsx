import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // ✅ yaha role define ho raha hai
  const role = localStorage.getItem("role");

  console.log("ROLE:", role);

  // ❌ agar role undefined ya match nahi hua
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;