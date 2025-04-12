import React, { Component } from "react";
import "./FunctionalGramm.css";

export default class FunctionalGramm extends Component {
    render() {
        return (
            <div className="functional-gramm-main-info">
                <p>
                    Вы здесь: <a href="/">Главная</a> / <a href="/resurs">Ресурсы</a> /{" "}
                    <span>Функциональная грамотность</span>
                </p>

                <div className="fin-gram-info">
                    <h1>Функциональная грамотность</h1>
                    <p>
                        Функциональная грамотность – это способность человека использовать
                        приобретаемые в течение жизни знания для решения широкого диапазона жизненных
                        задач в различных сферах человеческой деятельности, общения и социальных
                        отношений.
                    </p>
                    <p className="text-bold">В рамках функциональной грамотности выделяют шесть направлений:</p>
                    <ul>
                        <li>Читательская грамотность</li>
                        <li>Математическая грамотность</li>
                        <li>Естественнонаучная грамотность</li>
                        <li>Финансовая грамотность</li>
                        <li>Глобальные компетенции</li>
                        <li>Креативное мышление</li>
                    </ul>

                    <a href="https://viro33.ru/download/Распоряжение%20ДО-об%20орг.работы%20по%20повышению%20функц.грамотности.pdf" target="_blank" rel="noopener noreferrer">
                        Распоряжение Департамента образования Владимирской области № 987 от 17 сентября 2021 года
                    </a>

                    <p className="text-bold">1. Читательская грамотность</p>
                    <a href="https://www.youtube.com/watch?v=WhkhkF9Y8PE" target="_blank" rel="noopener noreferrer">
                        Читательская грамотность. Понятие
                    </a>

                    <p className="text-bold">2. Математическая грамотность</p>
                    <a href="https://www.youtube.com/watch?v=ny0IDWysVcQ&t=31s" target="_blank" rel="noopener noreferrer">
                        Математическая грамотность школьников. Понятие
                    </a>
                    <a href="https://www.youtube.com/watch?v=PO8KKeiPiSg" target="_blank" rel="noopener noreferrer">
                        Задания по математике: формирование математической грамотности
                    </a>

                    <p className="text-bold">3. Естественнонаучная грамотность</p>
                    <a href="https://www.youtube.com/watch?v=0uppmHj9B2A" target="_blank" rel="noopener noreferrer">
                        Формирование естественнонаучной грамотности средствами УМК по химии
                    </a>
                    <a href="https://www.youtube.com/watch?v=CH_OxVXhB0g" target="_blank" rel="noopener noreferrer">
                        Формирование естественно-научной грамотности на уроках биологии
                    </a>

                    <p className="text-bold">4. Финансовая грамотность</p>
                    <a href="https://www.youtube.com/watch?v=eYt3Shv5tjs" target="_blank" rel="noopener noreferrer">
                        Финансовая грамотность. Понятие
                    </a>
                    <p className="text-bold">5. Глобальные компетенции</p>
                    <a href="https://www.youtube.com/watch?v=gX5-1b3dBig&t=1202s" target="_blank" rel="noopener noreferrer">
                        «Глобальные компетенции» в международном исследовании PISA
                    </a>

                    <h2>Банк заданий</h2>
                    <a href="https://fg.resh.edu.ru/" target="_blank" rel="noopener noreferrer">
                        Электронный банк заданий по формированию функциональной грамотности Российской электронной школы
                    </a>
                </div>
            </div>
        );
    }
}
