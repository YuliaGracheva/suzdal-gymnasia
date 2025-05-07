import React, { Component } from "react";
import './css/AdminMain.css';

class AdminMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            passwordRequests: [],
            newPasswords: {} // userId -> new password
        };
    }

    componentDidMount() {
        this.fetchRequests();
        this.fetchPasswordRequests();
    }

    fetchRequests = async () => {
        try {
            const response = await fetch('http://localhost:3004/api/feedback');
            const data = await response.json();
            if (response.ok) {
                this.setState({ requests: data });
            } else {
                alert("Не удалось загрузить заявки на звонок.");
            }
        } catch (error) {
            console.error('Ошибка при получении заявок на звонок:', error);
        }
    };

    handleMarkProcessed = async (id) => {
        try {
            const response = await fetch(`http://localhost:3004/api/feedback/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                this.fetchRequests();
            } else {
                alert("Не удалось удалить заявку.");
            }
        } catch (error) {
            console.error('Ошибка при удалении заявки:', error);
        }
    };

    fetchPasswordRequests = async () => {
        try {
            const response = await fetch('http://localhost:3004/api/password-requests');
            const data = await response.json();
            if (response.ok) {
                this.setState({ passwordRequests: data });
            } else {
                alert("Не удалось загрузить заявки на смену пароля.");
            }
        } catch (error) {
            console.error('Ошибка при получении заявок на смену пароля:', error);
        }
    };

    handlePasswordChange = async (userId) => {
        const newPassword = this.state.newPasswords[userId];
        if (!newPassword) return alert("Введите новый пароль");

        try {
            const response = await fetch(`http://localhost:3004/api/users/${userId}/password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPassword })
            });

            if (response.ok) {
                alert("Пароль успешно изменён.");
                this.fetchPasswordRequests();
            } else {
                alert("Ошибка при изменении пароля.");
            }
        } catch (error) {
            console.error('Ошибка смены пароля:', error);
        }
    };

    handleInputChange = (userId, value) => {
        this.setState((prevState) => ({
            newPasswords: {
                ...prevState.newPasswords,
                [userId]: value
            }
        }));
    };

    render() {
        const { requests, passwordRequests, newPasswords } = this.state;
    
        return (
            <div className="admin-main">
                <h2>Заявки на звонок</h2>
                {requests.length > 0 ? (
                    <table className="requests-table">
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Телефон</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.name}</td>
                                    <td>{request.phone}</td>
                                    <td>
                                        <button onClick={() => this.handleMarkProcessed(request.id)}>
                                            Обработано
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <p>Нет заявок на звонок.</p>}
    
                <h2>Заявки на смену пароля</h2>
                {passwordRequests.length > 0 ? (
                    <table className="requests-table">
                        <thead>
                            <tr>
                                <th>Пользователь</th>
                                <th>Новый пароль</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordRequests.map((req) => (
                                <tr key={req.UserID}>
                                    <td>
                                        {/* Используем Username, если он существует, иначе показываем только UserID */}
                                        {req.Username || `ID: ${req.UserID}`}
                                        {/* Можно добавить и Login, если нужно: */}
                                        {req.Login && <span> ({req.Login})</span>}
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Новый пароль"
                                            value={newPasswords[req.UserID] || ''}
                                            onChange={(e) => this.handleInputChange(req.UserID, e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => this.handlePasswordChange(req.UserID)}>
                                            Сменить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <p>Нет заявок на смену пароля.</p>}
            </div>
        );
    }    
}

export default AdminMain;
