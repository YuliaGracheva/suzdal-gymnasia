import React, {Component} from "react";
import "./InternationalCoop.css";

class InternationalCoop extends Component {
    render() { 
        return ( 
            <div  className="international-coop-main-info">
                <p>Вы здесь: <a href="/">Главная</a> / <a href="/main-info"> Основные сведения </a> / Международное сотрудничество</p>

                <div className="international-coop-info">
                    <h1>Международное сотрудничество</h1>
                    <div className="purple-block">
                        <div className="white-block">
                            <h2>Информация о заключенных и планируемых к заключению договорах с иностранными и (или) международными организациями по вопросам образования и науки (при наличии)</h2>
                            <p>Информация о заключенных и планируемых к заключению договорах с иностранными и (или) международными организациями по вопросам образования и науки</p>
                            <a href=""><p>Скачать документ</p></a>
                        </div>

                        <div className="white-block">
                            <h2>Информация о международной аккредитации образовательных программ (при наличии)</h2>
                            <p>В ЧОУ «Суздальская Православная гимназия» образовательных программ с международной аккредитацией нет</p>
                            <a href="">Скачать документ</a>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default InternationalCoop;