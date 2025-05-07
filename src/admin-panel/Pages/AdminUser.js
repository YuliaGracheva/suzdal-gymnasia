import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser, updateUser } from "../../services/adminPanelService.js";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ username: "", role: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Ошибка загрузки пользователей", error);
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers(); 
  };

  const handleEdit = (user) => {
    setEditingId(user.UserId);
    setFormData({ username: user.Username, role: user.role });
  };

  const handleUpdate = async () => {
    const updatedUser = {
      UserId: editingId,
      Username: formData.username,
      role: formData.role,
    };
    await updateUser(updatedUser);
    setEditingId(null);
    loadUsers(); 
  };

  return (
    <div>
      <h2>Управление пользователями</h2>
      <h3>Список пользователей</h3>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.map((user) => (
            <tr key={user.UserId}>
              <td>
                {editingId === user.UserId ? (
                  <input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                ) : (
                  user.Username
                )}
              </td>
              <td>
                {editingId === user.UserId ? (
                  <input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingId === user.UserId ? (
                  <button onClick={handleUpdate}>Сохранить</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)}>Редактировать</button>
                    <button onClick={() => handleDelete(user.UserId)}>Удалить</button>
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
