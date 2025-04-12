import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "./css/admin-login.css";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const navigate = useNavigate();
    const location = useLocation();
    const errorFromState = location.state?.error;
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:3004/api/admin/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ login: username, password })
          });
      
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("isAdmin", "true");
            localStorage.setItem("adminUser", JSON.stringify(data.user));
            navigate("/admin/main");
          } else {
            const errData = await response.json();
            setError(errData.error || "Ошибка входа");
          }
        } catch (err) {
          setError("Ошибка подключения к серверу");
        }
      };      
  
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-box">
          <h2>Суздальская православная гимназия</h2>
          <h4>Вход для сотрудников</h4>
  
          <Form onSubmit={handleLogin}>
            {(error || errorFromState) && (
              <Alert variant="danger">{error || errorFromState}</Alert>
            )}

          <Form.Group className="mb-3">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите логин"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Войти
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
