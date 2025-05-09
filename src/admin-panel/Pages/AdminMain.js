import React, { Component } from "react";
import './css/AdminMain.css';

class AdminMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            passwordRequests: [],
            newPasswords: {},
            role: null
        };
    }

    async componentDidMount() {
        const userRaw = localStorage.getItem("adminUser");
        if (!userRaw) return;
    
        let user;
        try {
            user = JSON.parse(userRaw);
        } catch {
            console.error("Ошибка парсинга adminUser в localStorage");
            return;
        }
    
        const role = user?.Role || user?.role || null;
        console.log("Роль пользователя:", role);
        if (!role) return;
    
        this.setState({ role });
    
        if (role !== 'viewer') {
            await this.fetchRequests();
            await this.fetchPasswordRequests();
        }
    }    

    fetchRequests = async () => {
        try {
            const response = await fetch('http://localhost:3004/api/feedback');
            if (!response.ok) throw new Error();
            const data = await response.json();
            this.setState({ requests: data });
        } catch (error) {
            console.error('Ошибка при получении заявок на звонок:', error);
            alert("Не удалось загрузить заявки на звонок.");
        }
    };

    handleMarkProcessed = async (id) => {
        try {
            const response = await fetch(`http://localhost:3004/api/feedback/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error();
            this.fetchRequests();
        } catch (error) {
            console.error('Ошибка при удалении заявки:', error);
            alert("Не удалось удалить заявку.");
        }
    };

    fetchPasswordRequests = async () => {
        try {
            const response = await fetch('http://localhost:3004/api/password-requests');
            if (!response.ok) throw new Error();
            const data = await response.json();
            this.setState({ passwordRequests: data });
        } catch (error) {
            console.error('Ошибка при получении заявок на смену пароля:', error);
            alert("Не удалось загрузить заявки на смену пароля.");
        }
    };

    handlePasswordChange = async (userID) => {
        const newPassword = this.state.newPasswords[userID];
        if (!newPassword) return alert("Введите новый пароль");

        try {
            const response = await fetch(`http://localhost:3004/api/users/${userID}/password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPassword })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData?.error || 'Ошибка при изменении пароля');
            }

            alert("Пароль успешно изменён.");
            this.setState(prev => ({
                newPasswords: { ...prev.newPasswords, [userID]: '' }
            }));
            this.fetchPasswordRequests();
        } catch (error) {
            console.error('Ошибка смены пароля:', error);
            alert(error.message);
        }
    };

    handleCancelPasswordRequest = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3004/api/password-requests/${userId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error();
            this.fetchPasswordRequests();
        } catch (error) {
            console.error('Ошибка при удалении заявки на смену пароля:', error);
            alert("Не удалось удалить заявку.");
        }
    };

    handleInputChange = (userID, value) => {
        this.setState((prevState) => ({
            newPasswords: {
                ...prevState.newPasswords,
                [userID]: value
            }
        }));
    };

    render() {
        const { requests, passwordRequests, newPasswords, role } = this.state;

        if (role === null) {
            return null;
        }

        if (role === 'viewer') {
            return <p style={{ padding: '20px', fontSize: '18px' }}>У вас нет доступа к этому разделу.</p>;
        }

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
                                        {req.Username || `ID: ${req.UserID}`}
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
                                        <button
                                            onClick={() => this.handleCancelPasswordRequest(req.UserID)}
                                            style={{ marginLeft: '10px', backgroundColor: '#ccc' }}
                                        >
                                            Отменить
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
