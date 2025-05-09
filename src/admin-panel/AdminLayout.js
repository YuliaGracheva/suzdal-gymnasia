import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AdminLogin from './Pages/AdminLogin.js';
import AdminMain from './Pages/AdminMain.js';
import AdminMenu from './Pages/Components/AdminMenu.js';
import AdminTables from './Pages/AdminTables.js';
import AdminSettings from './Pages/AdminSettings.js';
import "./admin-layout.css";
import AdminHeader from "./Pages/Components/AdminHeader.js";
import ProtectedRoute from "./Pages/Components/ProtectedRoute.js";
import AdminFileUpload from "./Pages/AdminFileUpload.js";
import AdminUser from './Pages/AdminUser.js';
import ForgotPassword from "./Pages/ForgotPassword.js";

export default function AdminLayout() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const showMenu =
        location.pathname.startsWith("/admin") &&
        !["/admin", "/admin/forgot-password"].includes(location.pathname);

    return (
        <div className="admin-layout">
            <AdminHeader onToggleMenu={() => setMenuOpen(!menuOpen)} />
            {showMenu && (
                <div className={`admin-body ${menuOpen ? 'menu-open' : ''}`}>
                    <div className="admin-menu">
                        <AdminMenu />
                    </div>
                    <div className="admin-main-content">
                        <Routes>
                            <Route path="/" element={
                                <ProtectedRoute allowedRoles={["admin", "editor", "viewer"]}>
                                    <AdminLogin />
                                </ProtectedRoute>} />
                            <Route path="main" element={
                                <ProtectedRoute allowedRoles={["admin", "editor", "viewer"]}>
                                    <AdminMain />
                                </ProtectedRoute>} />
                            <Route path="user" element={
                                <ProtectedRoute allowedRoles={["admin"]}>
                                    <AdminUser />
                                </ProtectedRoute>} />
                            <Route path="tables" element={
                                <ProtectedRoute allowedRoles={["admin", "editor", "viewer"]}>
                                    <AdminTables />
                                </ProtectedRoute>} />
                            <Route path="settings" element={
                                <ProtectedRoute allowedRoles={["admin"]}>
                                    <AdminSettings />
                                </ProtectedRoute>} />
                            <Route path="upload" element={
                                <ProtectedRoute allowedRoles={["admin", "editor", "viewer"]}>
                                    <AdminFileUpload />
                                </ProtectedRoute>} />
                            <Route path="forgot-password" element={
                                <ProtectedRoute allowedRoles={["admin", "editor", "viewer"]}>
                                    <ForgotPassword />
                                </ProtectedRoute>} />
                        </Routes>
                    </div>
                </div>
            )}
            {!showMenu && (
                <Routes>
                    <Route path="/" element={<AdminLogin />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                </Routes>
            )}

        </div>
    );
}
