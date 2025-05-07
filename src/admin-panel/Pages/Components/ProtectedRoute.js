import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userData = JSON.parse(localStorage.getItem("adminUser"));
  const isAdmin = localStorage.getItem("isAdmin");

  if (!isAdmin || !userData || !allowedRoles.includes(userData.role)) {
    return (
      <Navigate
        to="/admin"
        replace
        state={{ error: "Доступ запрещён. Недостаточно прав." }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
