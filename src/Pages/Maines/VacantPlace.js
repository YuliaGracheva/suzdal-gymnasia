import React, { Component } from "react";
import "./VacantPlace.css";

class VacantPlace extends Component {
    render() {
        return (
            <div className="vacant-place-main-info">
                <p>Вы здесь: <a href="/">Главная</a> / <a href="/main-info"> Основные сведения </a> / Вакантные места для приема (перевода) обучающихся</p>
                
                <div className="vacant-place-content">
                    <h1>Вакантные места для приема (перевода)</h1>
                    <div className="section">
                        <h2>Количество вакантных мест для приема (перевода)</h2>

                        <div className="subsection">
                            <h3>За счет бюджетных ассигнований федерального бюджета</h3>
                            <p>нет</p>
                        </div>

                        <div className="subsection">
                            <h3>За счет бюджетных ассигнований бюджетов субъекта Российской Федерации</h3>
                            <p><strong>В 2023/2024 учебном году:</strong></p>
                            <ul>
                                <li>3 класс – 2 места</li>
                                <li>6 класс – 5 мест</li>
                                <li>10 класс – 2 места</li>
                                <li>11 класс – 5 мест</li>
                            </ul>
                        </div>

                        <div className="subsection">
                            <h3>За счет бюджетных ассигнований местных бюджетов</h3>
                            <p>нет</p>
                        </div>

                        <div className="subsection">
                            <h3>За счет средств физических и (или) юридических лиц</h3>
                            <p>нет</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VacantPlace;
