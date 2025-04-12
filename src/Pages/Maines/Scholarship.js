import React, { Component } from "react";
import './Scholarship.css';

class Scholarship extends Component {
    render() {
        return (
            <div className="scholarships-main-info">
                <p>Вы здесь: <a href="/">Главная</a> / <a href="/main-info"> Основные сведения </a> / Стипендии</p>

                <div className="scholarship-info">
                    <h1>Информация о стипендиях и иных формах материальной поддержки</h1>

                    <div className="scholarship-section">
                        <h2>Информация о наличии общежитий</h2>
                        <p>Количество: <strong>0</strong></p>
                    </div>

                    <div className="scholarship-section">
                        <h2>Информация о наличии интернатов</h2>
                        <p>Количество: <strong>0</strong></p>
                    </div>

                    <div className="scholarship-section">
                        <h2>Информация о трудоустройстве выпускников</h2>
                        <p>2020 год: <strong>19</strong></p>
                        <p>Направлено на места трудоустройства: <strong>0</strong></p>
                        <p>Количество официальных подтверждений: <strong>0</strong></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Scholarship;
