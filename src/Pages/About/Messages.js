import React, { useEffect, useState } from "react";
import "./Message.css"; // не забудь создать этот файл

function Message() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3004/api/message")
            .then((res) => res.json())
            .then((data) => {
                console.log("Данные сообщений:", data);
                setMessages(data);
            })
            .catch((err) => console.error("Ошибка загрузки сообщений:", err));
    }, []);

    return (
        <div className="message-container">
            <h1 className="message-title">Объявления</h1>
            <div className="purple-line"></div>
            {messages.map((msg) => (
                <div key={msg.MessageID} className="message-card">
                    <div className="message-theme">{msg.MessageTheme}</div>
                    <div className="message-description">{msg.MessageDescription}</div>
                    <div className="message-author">Автор: {msg.Username}</div>
                </div>
            ))}
        </div>
    );
}

export default Message;
