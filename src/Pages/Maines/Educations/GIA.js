import React, { Component } from "react";
import "./GIA.css";

class GIA extends Component {
    render() {
        return (
            <div className="gia-main-info">
                <p>Вы здесь: <a href="/">Главная</a> / <a href="/main-info">Основные сведения</a> / <a href="/main-info/education">Образование</a> / ГИА</p>
                <div className="gia-info">
                    <h1>Государственная итоговая аттестация</h1>
                    <div className="link-gia">
                    </div>
                    <img />
                    <img />
                    <h2>Ссылки на разделы</h2>
                    <pre>
                        «ГИА» и «Навигатор ГИА» официального сайта Рособрнадзора (obrnadzor.gov.ru), телефон «горячей линии» Рособрнадзора по вопросам ЕГЭ и телефон доверия ЕГЭ, официальные сайты ФГБНУ «ФИПИ» (fipi.ru) и ФГБУ «ФЦТ» (rustest.ru).
                        Тематические видеоролики, размещенные в официальной группе Рособрнадзора в социальной сети «ВКонтакте» (https://vk.com/rosobrnadzor) (ссылки прилагаются).
                        Дополнительно сообщаем, что актуальная информация о ГИА размещена на Официальном сайте Рособрнадзора (obrnadzor.gov.ru) и в официальном телеграмм-канале (t.me/rosobrnadzor_official).
                    </pre>
                    <h2>Ссылки на тематические видеоролики</h2>
                    <div className="gia-video-links">
                        <a href="https://vkvideo.ru/video-36510627_456239775" target="_blank" rel="noopener noreferrer">1) Про мотивацию</a>
                        <a href="https://vkvideo.ru/video-36510627_456239774" target="_blank" rel="noopener noreferrer">2) Про страхи</a>
                        <a href="https://vkvideo.ru/video-36510627_456239773" target="_blank" rel="noopener noreferrer">3) Про энергию</a>
                        <a href="https://vkvideo.ru/video-36510627_456239772" target="_blank" rel="noopener noreferrer">4) Про лень и прокрастинацию</a>
                        <a href="https://vkvideo.ru/video-36510627_456239771" target="_blank" rel="noopener noreferrer">5) Про эмоции и эмоциональный интеллект</a>
                        <a href="https://vkvideo.ru/video-36510627_456239770" target="_blank" rel="noopener noreferrer">6) Про память</a>
                        <a href="https://vkvideo.ru/video-36510627_456239769" target="_blank" rel="noopener noreferrer">7) Про внешний вид</a>
                        <a href="https://vkvideo.ru/video-36510627_456239768" target="_blank" rel="noopener noreferrer">8) Про время</a>
                        <a href="https://vkvideo.ru/video-36510627_456239767" target="_blank" rel="noopener noreferrer">9) Про уверенность в себе</a>
                        <a href="https://vkvideo.ru/video-36510627_456239765" target="_blank" rel="noopener noreferrer">10) Про цели</a>
                        <a href="https://vkvideo.ru/video-36510627_456239764" target="_blank" rel="noopener noreferrer">11) Про стресс и победу</a>
                    </div>

                </div>
            </div>
        );
    }
}

export default GIA;