import React, { Component } from "react";

import avo from "../img/avo.jpg";
import avodo from "../img/avo-do.jpg";
import edin_kol from "../img/edin-kol.jpg";
import edin_okno from "../img/edin_okno.jpg";
import fceor from "../img/fceor.jpg";
import fpro from "../img/fpro.jpg";
import min_onrf from "../img/min-onrf.jpg";
import min_prosv from "../img/min-prosv.jpg";
import muzey_suvorova from "../img/muzey-suvorova.jpg";
import omofor from "../img/omofor.jpg";
import suz_reg_uo from "../img/suz-reg-uo.jpg";
import suz_reg from "../img/suz-reg.jpg";
import './Footer.css';

class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="purple-footer-contact">
                    <div className="contact-info">
                        <h2 className="footer-h">Наши контакты</h2>
                        <p className="contact-text">
                            601293, Владимирская обл., г. Суздаль, ул. Васильевская , дом 7<br />
                            Телефоны:<br />
                            +7 49231 2-13-64 (директор)<br />
                            +7 49231 2-52-43 (вахта)<br />
                            Факс:<br />
                            +7 49231 2-13-64<br />
                            E-mail:<br />
                            <a href="mailto:orthodox2001@yandex.ru">orthodox2001@yandex.ru</a>
                        </p>
                    </div>
                    <div className="useful-resurs-white">
                        <div className="block">
                            <a href="https://avo.ru/" target="_blank" rel="noopener noreferrer">
                                <img src={avo} />
                                <p>Администрация Владимирской области</p>
                            </a>
                        </div>
                        <div className="block">
                            <a href="https://министерство.образование33.рф/" target="_blank" rel="noopener noreferrer">
                                <img src={avodo} />
                                <p>Департамент образования Владимирской области</p>
                            </a>
                        </div>
                        <div className="block">
                            <a href="https://web.archive.org/web/20141007145643/http://school-collection.edu.ru/collection/" target="_blank" rel="noopener noreferrer">
                                <img src={edin_kol} />
                                <p>Единая коллекция цифровых образовательных ресурсов</p>
                            </a>
                        </div>
                        <div className="block">
                            <a href="https://web.archive.org/web/20191122092928/http://window.edu.ru/" target="_blank" rel="noopener noreferrer">
                                <img src={edin_okno} />
                                <p>Единое окно доступа к образовательным ресурсам</p>
                            </a>
                        </div>
                        <div className="block">
                            <a href="https://web.archive.org/web/20191121151247/http://fcior.edu.ru/" target="_blank" rel="noopener noreferrer">
                                <img src={fceor} />
                                <p>Федеральный центр информационно-образовательных ресурсов</p>
                            </a>
                        </div>
                        <div className="block">
                            <a href="https://edu.ru/" target="_blank" rel="noopener noreferrer">
                                <img src={fpro} />
                                <p>Федеральный портал Российское образование</p>
                            </a>
                        </div>
                        <div className="block">
                            <a href="https://minobrnauki.gov.ru/" target="_blank" rel="noopener noreferrer">
                                <img src={min_onrf} />
                                <p>Министерство образования и науки РФ</p>
                            </a>
                        </div>
                        <div className="block">
                            <a href="https://edu.gov.ru/" target="_blank" rel="noopener noreferrer">
                                <img src={min_prosv} />
                                <p>Министерство просвещения РФ</p>
                            </a>
                        </div>
                        <div className="block">
                            <a href="https://suvorovkistysh.ru/" target="_blank" rel="noopener noreferrer">
                                <img src={muzey_suvorova} />
                                <p>Музей А.В. Суворова в с. Кистыш</p>
                            </a>
                        </div>
                        <div className="block">
                            <a href="https://omofor.ru/" target="_blank" rel="noopener noreferrer">
                                <img src={omofor} />
                                <p>Региональная общественная организация ветеранов и инвалидов силовых структур
                                    «ОМОРОФ-СУВОРОВСКИЙ ПРИЗЫВ»</p>
                            </a>
                        </div>
                        <div className="block">
                            <a href="https://www.suzdalregion.ru/edu/" target="_blank" rel="noopener noreferrer">
                                <img src={suz_reg_uo} />
                                <p>Управление образования администрации Суздальского района</p>
                            </a>
                        </div>
                        <div className="block">
                            <a href="https://www.suzdalregion.ru/" target="_blank" rel="noopener noreferrer">
                                <img src={suz_reg} />
                                <p>Администрация Суздальского района</p>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="map-footer">
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A2313bfa3890e186fb46167e654aa66e323d4ea91321dc42ce783a9b0cdc4ac3d&amp;source=constructor"
                        width="100%"
                        height="315"
                        frameBorder="0"
                        title="Карта"
                        style={{ display: "block" }}
                    ></iframe>
                </div>


                <div className="yellow-footer-down">
                    <h2 className="footer-down-name">Появились вопросы? Свяжитесь с нами!</h2>
                    <div className="footer-down-info">
                        <div className="footer-down-call-me">
                            <div className="footer-down-call-me-info">
                                <h3>Данные для запроса звонка</h3>
                                <label htmlFor="name">Ваше имя:</label>
                                <textarea id="name" className="call-me-text-area"></textarea>
                                <label htmlFor="phone">Номер телефона:</label>
                                <textarea id="phone" className="call-me-text-area"></textarea>
                            </div>
                            <button type="button" className="call-me-button">Запросить звонок</button>
                        </div>
                        <div className="footer-down-developer-info">
                            <h3>Разработчик</h3>
                            <p>Грачева Юлия Алексеевна</p>
                            <p>+79004812276</p>
                            <p><a href="mailto:a9904070@gmail.com">a9904070@gmail.com</a></p>

                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
