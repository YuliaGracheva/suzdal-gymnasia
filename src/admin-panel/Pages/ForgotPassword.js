import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://yuliagracheva.github.io/suzdal-gymnasia/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || "Ошибка при отправке запроса");
      }
    } catch (err) {
      setError("Ошибка подключения к серверу");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box">
        <h4>Запрос на восстановление пароля</h4>

        {submitted ? (
          <Alert variant="success">
            Запрос на изменение пароля отправлен администратору.
            <div className="mt-3">
              <Button onClick={() => navigate("/admin")}>Вернуться ко входу</Button>
            </div>
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="username">
              <Form.Label htmlFor="username">Введите логин</Form.Label>
              <Form.Control
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Логин"
                required
                autoComplete="username"
              />
            </Form.Group>
            <Button type="submit" className="w-100">
              Отправить запрос
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
