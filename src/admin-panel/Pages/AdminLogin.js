import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import "./css/admin-login.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/admin/forgot-password');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3004/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ login: username, password })
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data && data.user) {
          if (data.user.isBlocked === "Заблокирован") {
            setError("Ваш аккаунт заблокирован");
            return;
          }

          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("adminUser", JSON.stringify(data.user)); 
          navigate("/admin/main");
        } else {
          setError("Не удалось сохранить данные пользователя");
        }
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
          {(error || successMessage) && (
            <Alert variant={successMessage ? "success" : "danger"}>
              {successMessage || error}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
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
              autoComplete="current-password"
              placeholder="Введите пароль"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Войти
          </Button>
        </Form>

        <Button variant="link" onClick={handleForgotPassword}>
          Забыли пароль?
        </Button>
      </div>
    </div>
  );
};

export default AdminLogin;
