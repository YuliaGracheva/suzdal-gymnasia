import React, { Component } from "react";
import './Leadership.css';

class Leadership extends Component {
    render() {
        return (
            <div className="leadership-main-info">
                <p>Вы здесь: <a href="/">Главная</a> / <a href="/main-info"> Основные сведения </a> / Руководство</p>

                <div className="leadership-info">
                    <h1>Информация о руководстве образовательной организации</h1>

                    <div className="leader-card">
                        <h2>Аникина Нина Владимировна</h2>
                        <p><strong>Должность:</strong> Директор</p>
                        <p><strong>Контактный телефон:</strong> 8 (49231) 2-13-64</p>
                        <p><strong>Email:</strong> orthodox2001(@)yandex.ru</p>
                    </div>

                    <div className="leader-card">
                        <h2>Пугина Лариса Евгеньевна</h2>
                        <p><strong>Должность:</strong> Заместитель директора по УР</p>
                        <p><strong>Контактный телефон:</strong> 8 (49231) 2-13-64</p>
                        <p><strong>Email:</strong> orthodox2001(@)yandex.ru</p>
                    </div>

                    <div className="leader-card">
                        <h2>Ломакина Светлана Владимировна</h2>
                        <p><strong>Должность:</strong> Главный бухгалтер</p>
                        <p><strong>Контактный телефон:</strong> 8 (49231) 2-13-64</p>
                        <p><strong>Email:</strong> orthodox2001(@)yandex.ru</p>
                    </div>

                    <div className="leader-card">
                        <h2>Сторожков Анатолий Вячеславович</h2>
                        <p><strong>Должность:</strong> Заведующий хозяйством</p>
                        <p><strong>Контактный телефон:</strong> 8 (49231) 2-13-64</p>
                        <p><strong>Email:</strong> orthodox2001(@)yandex.ru</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Leadership;
