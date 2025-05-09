import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userData = JSON.parse(localStorage.getItem("adminUser"));
    const isAdmin = localStorage.getItem("isAdmin");
  
    console.log("User data from localStorage:", userData);
    console.log("Allowed roles:", allowedRoles);
    console.log("User role from localStorage:", userData?.Role);
    console.log("Is admin status:", isAdmin);
  
    if (!isAdmin || !userData || !allowedRoles.includes(userData.Role)) {
      console.log("Access denied, redirecting...");
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
