import React, { useEffect, useState } from "react";
import {
  fetchUsers,
  updateUser,
  createUser,
} from "../../services/adminPanelService.js";
import './css/AdminUsers.css';

const ROLE_HINTS = {
  viewer: "Viewer может только просматривать данные.",
  editor: "Editor может редактировать содержимое.",
};

const Toast = ({ message, type, onClose }) => {
  if (!message) return null;

  const background = type === "success" ? "#4caf50" : "#f44336";

  return (
    <div className={`toast ${type}`} style={{ background }}>
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ username: "", role: "", login: "", password: "" });
  const [newUser, setNewUser] = useState({ username: "", role: "", login: "", password: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      const usersWithStatus = data.map(user => ({
        ...user,
        isBlocked: user.isBlocked === "Заблокирован" ? "Заблокирован" : "Разблокирован",
      }));
      setUsers(usersWithStatus);
    } catch (error) {
      console.error("Ошибка загрузки пользователей", error);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.UserID);
    setFormData({
      username: user.Username,
      role: user.role,
      login: user.Login,
      password: "",
    });
  };

  const handleUpdate = async () => {
    if (!formData.username || !formData.role || !formData.login) {
      setErrorMessage("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    const updatedUser = {
      UserID: editingId,
      Username: formData.username,
      role: formData.role,
      Login: formData.login,
      isBlocked: users.find(user => user.UserID === editingId).isBlocked, // передаем текущее значение isBlocked
    };

    if (formData.password) {
      updatedUser.password = formData.password;
    }

    console.log("Updating user with data:", updatedUser);

    try {
      await updateUser(updatedUser);
      setEditingId(null);
      loadUsers();  
    } catch (error) {
      console.error("Ошибка обновления пользователя", error);
      setErrorMessage("Не удалось обновить пользователя. Попробуйте позже.");
    }
};


  const handleCreate = async () => {
    const { username, role, login, password } = newUser;
    const newErrors = {};

    if (!username.trim()) newErrors.username = "Имя обязательно";
    if (!role) newErrors.role = "Роль обязательна";
    if (!login.trim()) newErrors.login = "Логин обязателен";
    if (!password.trim()) newErrors.password = "Пароль обязателен";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const userData = {
        ...newUser,
        isBlocked: "Разблокирован",
      };

      await createUser(userData);
      setNewUser({ username: "", role: "", login: "", password: "" });
      setErrors({});
      setSuccessMessage("Пользователь успешно создан!");
      setErrorMessage("");
      loadUsers();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Ошибка создания пользователя", error);
      setNewUser({ username: "", role: "", login: "", password: "" });
      setErrors({});
      setErrorMessage("Не удалось создать пользователя. Попробуйте позже.");
      setSuccessMessage("");

      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleBlockUnblock = async (user) => {
    if (user.role === "admin") {
      return;
    }

    const updatedUser = {
      ...user,
      isBlocked: user.isBlocked === "Заблокирован" ? "Разблокирован" : "Заблокирован", 
    };

    try {
      await updateUser(updatedUser);
      loadUsers();
    } catch (error) {
      console.error("Ошибка обновления пользователя", error);
    }
  };

  return (
    <div className="admin-users">
      <Toast message={successMessage} type="success" onClose={() => setSuccessMessage("")} />
      <Toast message={errorMessage} type="error" onClose={() => setErrorMessage("")} />

      <h2>Управление пользователями</h2>

      <h3>Создать нового пользователя</h3>
      <div className="create-user-form">
        <input
          placeholder="Имя пользователя"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        {errors.username && <span className="error">{errors.username}</span>}
        <input
        placeholder="Логин"
          value={newUser.login}
          onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
        />
        {errors.login && <span className="error">{errors.login}</span>}
        <input
          placeholder="Пароль"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="">Выберите роль</option>
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
        </select>
        {errors.role && <span className="error">{errors.role}</span>}
        {newUser.role && <p><em>{ROLE_HINTS[newUser.role]}</em></p>}
        <button onClick={handleCreate}>Создать</button>
      </div>

      <h3>Список пользователей</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Логин</th>
            <th>Роль</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.UserID}>
              <td>{editingId === user.UserID ? (
                <input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              ) : user.Username}</td>
              <td>{editingId === user.UserID ? (
                <input
                  value={formData.login}
                  onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                />
              ) : user.Login}</td>
              <td>{editingId === user.UserID ? (
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                </select>
              ) : user.role}</td>
              <td>{user.isBlocked}</td>
              <td>
                {editingId === user.UserID ? (
                  <button onClick={handleUpdate}>Сохранить</button>
                ) : (
                  <>
                    <button
                      className={`btn ${user.isBlocked === "Заблокирован" ? "unblock" : "block"}`}
                      onClick={() => handleBlockUnblock(user)}
                      disabled={user.role === "admin"}
                    >
                      {user.isBlocked === "Заблокирован" ? "Разблокировать" : "Заблокировать"}
                    </button>
                    <button
                      className="btn edit"
                      onClick={() => handleEdit(user)}
                    >
                      Редактировать
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
