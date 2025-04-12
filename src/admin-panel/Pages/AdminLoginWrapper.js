import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";

const AdminLoginWrapper = () => {
  const navigate = useNavigate();
  return <AdminLogin navigate={navigate} />;
};

export default AdminLoginWrapper;
