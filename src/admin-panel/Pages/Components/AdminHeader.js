import React from 'react';
import { FaBars } from 'react-icons/fa';
import './css/AdminHeader.css';

const AdminHeader = ({ onToggleMenu }) => {
  return (
    <div className="admin-header">
      <button className="burger-btn" onClick={onToggleMenu}>
        <FaBars />
      </button>
      <h1>Админ-панель</h1>
    </div>
  );
};

export default AdminHeader;
