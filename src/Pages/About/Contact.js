import React, { Component } from "react";
import './css/contacts.css';

class Contact extends Component {
    render() {
        return (
            <div className="contact-main-info">
                <p>Вы здесь: <a href="/">Главная</a> / <a href="/about">О нас</a> / Контакты</p>

                <h1>Контакты</h1>
                <div className="purple-line"></div>

                <div className="contact-info">
                    <div className="purple-contact-block">
                        <div className="white-contact-block">
                            <h2>Свяжитесь с нами</h2>
                            <pre>
                                601293, Владимирская обл., г. Суздаль, ул. Васильевская, дом 7
                                Телефоны:
                                +7 49231 2-13-64 (Директор)
                                +7 49231 2-52-43 (вахта)
                                Факс:
                                +7 49231 2-13-64
                                E-mail:
                                orthodox2001@yandex.ru
                            </pre>
                        </div>
                        <div className="white-contact-block">
                            <h2>Наши банковские реквизиты</h2>
                            <pre>
                                ИНН 3310003536
                                КПП 331001001
                                ОГРН 1023302552657
                                р/с 40703810810000001476
                                Владимирское отделение №8611
                                ПАО Сбербанк г. Владимир
                                к/с 30101810000000000602
                                БИК 041708602
                            </pre>
                        </div>
                    </div>
                    <div className="purple-contact-block">
                        <div className="white-contact-block">
                            <h2>Принимаем пожертвования на уставную деятельность</h2>
                            <button class="button-donat">Пожертвовать на уставную деятельность учреждения 100 руб.</button>
                            <button class="button-donat">Пожертвовать на уставную деятельность учреждения 300 руб.</button>
                            <button class="button-donat">Пожертвовать на уставную деятельность учреждения 500 руб.</button>
                            <button class="button-donat">Пожертвовать на уставную деятельность учреждения 1 000 руб.</button>
                            <button class="button-donat">Пожертвовать на уставную деятельность учреждения 3 000 руб.</button>
                            <button class="button-donat">Пожертвовать на уставную деятельность учреждения 5 000 руб.</button>
                            <button class="button-donat">Пожертвовать на уставную деятельность учреждения 10 000 руб.</button>
                            <button class="button-donat">Пожертвовать на уставную деятельность учреждения 50 000 руб.</button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;