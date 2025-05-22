import React, { useEffect, useState } from "react";
import "./Message.css"; 

function Message() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch("http://4854069-fc63586.twc1.net/api/message")
            .then((res) => res.json())
            .then((data) => {
                console.log("Данные сообщений:", data);
                setMessages(data);
            })
            .catch((err) => console.error("Ошибка загрузки сообщений:", err));
    }, []);

    return (
        <div className="message-container">
            <p>Вы здесь: <a href="/">Главная</a> / <a href="/main-info">Основные сведения</a> / Объявления</p>
            <h1 className="message-title">Объявления</h1>
            <div className="purple-line"></div>
            {messages.map((msg) => (
                <div key={msg.MessageID} className="message-card">
                    <div className="message-theme">{msg.MessageTheme}</div>
                    <div className="message-description" dangerouslySetInnerHTML={{ __html: msg.MessageDescription }} />
                    <div className="message-author">Автор: {msg.Username}</div>
                </div>
            ))}
        </div>
    );
}

export default Message;
