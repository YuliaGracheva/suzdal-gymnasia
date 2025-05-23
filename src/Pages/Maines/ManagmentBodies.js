import React, { Component } from "react";
import './ManagmentBodies.css';
class ManagmentBodies extends Component {
    state = {
        bodies: []
    };

    componentDidMount() {
        fetch("http://46.149.69.12:3004/api/managementbodies")
            .then((res) => res.json())
            .then((data) => {
                console.log("Данные об органах управления:", data);
                this.setState({ bodies: data });
            })
            .catch((err) => console.error("Ошибка при загрузке:", err));
    }

    render() {
        const { bodies } = this.state;

        return (
            <div className="managment-bodies-main-info">
                <p>Вы здесь: <a href="/">Главная</a> / <a href="/main-info">Основные сведения</a> / Структура и органы управления образовательной организации</p>

                {bodies.length === 0 ? (
                    <p>Нет информации об органах управления.</p>
                ) : (
                    bodies.map((body, index) => (
                        <div key={index} className="management-body-card">
                            <h2>{body.ManagementBodiesName}</h2>
                            <p><strong>Номер:</strong> {body.ManagementBodiesNumber}</p>
                            <p><strong>Email:</strong> {body.ManagementBodiesEmail}</p>
                            <p><strong>Адрес:</strong> г. {body.ManagementBodiesCity}, ул. {body.ManagementBodiesStreet}, д. {body.ManagementBodiesHome}</p>
                            <p><strong>ФИО сотрудника:</strong> {body.ManagementBodiesSurnameEmployee} {body.ManagementBodiesNameEmployee} {body.ManagementBodiesPatronymicEmployee}</p>
                            <p><strong>Должность:</strong> {body.ManagementBodiesPositionEmployee}</p>
                            <p><strong>Веб-сайт:</strong> <a href={body.ManagementBodiesSite} target="_blank" rel="noopener noreferrer">{body.ManagementBodiesSite}</a></p>
                            <p><strong>Режим работы:</strong> {body.ManagementBodiesOperatingMode}</p>
                        </div>
                    ))
                )}
            </div>
        );
    }
}

export default ManagmentBodies;
