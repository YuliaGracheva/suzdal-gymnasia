import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (!isAdmin) {
        return (
            <Navigate
                to="/admin"
                replace
                state={{ error: "Доступ запрещён. Пожалуйста, войдите." }}
            />
        );
    }

    return children;
};

export default ProtectedRoute;
