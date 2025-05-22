import React, { useEffect, useState } from "react";
import "./Olympiad.css";

const Olympiad = () => {
    const [olympiads, setOlympiads] = useState([]);

    useEffect(() => {
        console.log("Компонент Olympiad загружен");
        fetch("http://4854069-fc63586.twc1.net/api/olympiads")
            .then(res => res.json())
            .then(data => {
                console.log("Данные получены:", data);
                setOlympiads(data);
            })
            .catch(error => console.error("Ошибка при получении данных:", error));
    }, []);
    

    return (
        <div className="olympiad-main-info">
            <p>Вы здесь: <a href="/">Главная</a> / <a href="/main-info">Основные сведения</a> / Олимпиадники</p>
            <h1>Олимпиадники</h1>
            <div className="table-wrapper">
                <table className="olympiad-table">
                    <thead>
                        <tr>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Класс</th>
                            <th>Предмет</th>
                            <th>Статус</th>
                            <th>Баллы</th>
                            <th>Место</th>
                        </tr>
                    </thead>
                    <tbody>
                        {olympiads.map((olymp, index) => (
                            <tr key={index}>
                                <td>{olymp.OlympiadSurname}</td>
                                <td>{olymp.OlympiadName}</td>
                                <td>{olymp.OlympiadClass}</td>
                                <td>{olymp.SubjectName}</td>
                                <td>{olymp.StatusName}</td>
                                <td>{olymp.OlympiadQuanityPoints}</td>
                                <td>{olymp.OlympiadPlace}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Olympiad;
