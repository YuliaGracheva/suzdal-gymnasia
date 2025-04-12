import React, { Component } from "react";
import "./EducationProcess.css";

class EducationProcess extends Component {
    render() {
        return (
            <div className="education-process-container">
                <p className="breadcrumbs">
                    Вы здесь: <a href="/">Главная</a> / <a href="/main-info">Основные сведения</a> / <a href="/main-info/education">Образование</a> / Образовательный процесс
                </p>

                <h1 className="title">Образовательные программы</h1>

                <div className="table-wrapper">
                    <table className="education-table">
                        <thead>
                            <tr>
                                <th>Уровень образования</th>
                                <th>Срок обучения</th>
                                <th>Форма обучения</th>
                                <th>Численность обучающихся (бюджет)</th>
                                <th>Платное обучение</th>
                                <th>Иностранные граждане</th>
                                <th>Наименование программы</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Начальное общее образование</td>
                                <td>4 года</td>
                                <td>Очная</td>
                                <td>71</td>
                                <td>Нет</td>
                                <td>0</td>
                                <td>Образовательная программа начального общего образования</td>
                            </tr>
                            <tr>
                                <td>Основное общее образование</td>
                                <td>5 лет</td>
                                <td>Очная</td>
                                <td>67</td>
                                <td>Нет</td>
                                <td>0</td>
                                <td>Основная образовательная программа основного общего образования</td>
                            </tr>
                            <tr>
                                <td>Среднее общее образование</td>
                                <td>2 года</td>
                                <td>Очная</td>
                                <td>13</td>
                                <td>Нет</td>
                                <td>0</td>
                                <td>Образовательная программа среднего общего образования</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="additional-info">
                    <p><strong>Язык обучения:</strong> Русский</p>
                    <p><strong>Аккредитация:</strong> до 22 мая 2027 г.</p>
                    <p><strong>Общее число обучающихся за счет бюджета субъекта РФ:</strong> 151</p>
                    <p><strong>Обучение за счет федерального/местного бюджета:</strong> Нет</p>
                    <p><strong>Обучение по договорам с физ./юр. лицами:</strong> Нет</p>
                    <p><strong>Использование ЭО и ДОТ:</strong> Не используется</p>
                </div>
            </div>
        );
    }
}

export default EducationProcess;
