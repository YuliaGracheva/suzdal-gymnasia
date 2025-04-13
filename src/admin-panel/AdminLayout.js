import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AdminLogin from './Pages/AdminLogin';
import AdminMain from './Pages/AdminMain';
import AdminMenu from './Pages/Components/AdminMenu';
import AdminTables from './Pages/AdminTables';
import AdminSettings from './Pages/AdminSettings';
import "./admin-layout.css";
import AdminHeader from "./Pages/Components/AdminHeader";
import ProtectedRoute from "./Pages/Components/ProtectedRoute";
import AdminFileUpload from "./Pages/AdminFileUpload";

export default function AdminLayout() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const showMenu = location.pathname.startsWith("/admin") && location.pathname !== "/admin";

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
                                <ProtectedRoute>
                                    <AdminLogin />
                                </ProtectedRoute>} />
                            <Route path="main" element={
                                <ProtectedRoute>
                                    <AdminMain />
                                </ProtectedRoute>} />
                            <Route path="tables" element={
                                <ProtectedRoute>
                                    <AdminTables />
                                </ProtectedRoute>} />
                            <Route path="settings" element={
                                <ProtectedRoute>
                                    <AdminSettings />
                                </ProtectedRoute>} />
                                <Route path="upload" element={
                                <ProtectedRoute>
                                    <AdminFileUpload />
                                </ProtectedRoute>} />
                        </Routes>
                    </div>
                </div>
            )}
            {!showMenu && (
                <Routes>
                    <Route path="/" element={<AdminLogin />} />
                </Routes>
            )}
        </div>
    );
}
