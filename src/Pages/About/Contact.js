import React, { Component } from "react";
import './css/contacts.css';

class Contact extends Component {
    constructor(props) {
            super(props);
            this.state = {
                contactInfo: {
                    address: '',
                    phones: '',
                    email: ''
                },
                recaptchaToken: null,
                useRecaptcha: false
            };
        }

        componentDidMount() {
            fetch("/api/settings")
                .then((res) => res.json())
                .then((data) => {
                    if (!data) return;
        
                    const contacts = JSON.parse(data.contacts || "{}");
                    
                    this.setState({
                        contactInfo: contacts,
                    });
                })
                .catch((err) => {
                    console.error("Ошибка при загрузке настроек:", err);
                });
        }    

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
                            <p className="contact-text">
                                {this.state.contactInfo.address && (
                                    <>
                                        {this.state.contactInfo.address}<br />
                                    </>
                                )}
                                {this.state.contactInfo.phones && (
                                    <>
                                        Телефоны:<br />
                                        {this.state.contactInfo.phones}<br />
                                    </>
                                )}
                                {this.state.contactInfo.email && (
                                    <>
                                        E-mail:<br />
                                        <a href={`mailto:${this.state.contactInfo.email}`}>{this.state.contactInfo.email}</a>
                                    </>
                                )}
                            </p>
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
                            <button class="button-donat" href="https://yookassa.ru/my/i/ZkrfKFT8XDEd/l">Пожертвовать на уставную деятельность учреждения 100 руб.</button>
                            <button class="button-donat" href="https://yookassa.ru/my/i/Zkrfu0c_3BPc/l">Пожертвовать на уставную деятельность учреждения 300 руб.</button>
                            <button class="button-donat" href="https://yookassa.ru/my/i/ZkMXA1McXWcF/l">Пожертвовать на уставную деятельность учреждения 500 руб.</button>
                            <button class="button-donat" href="https://yookassa.ru/my/i/ZkMngV04waU7/l">Пожертвовать на уставную деятельность учреждения 1 000 руб.</button>
                            <button class="button-donat" href="https://yookassa.ru/my/i/ZkMnnK_57MGe/l">Пожертвовать на уставную деятельность учреждения 3 000 руб.</button>
                            <button class="button-donat" href="https://yookassa.ru/my/i/ZkMnvH9LPA1O/l">Пожертвовать на уставную деятельность учреждения 5 000 руб.</button>
                            <button class="button-donat" href="https://yookassa.ru/my/i/ZkSd1exilCqn/l">Пожертвовать на уставную деятельность учреждения 10 000 руб.</button>
                            <button class="button-donat" href="https://yookassa.ru/my/i/ZkSeRVHRFgOt/l">Пожертвовать на уставную деятельность учреждения 50 000 руб.</button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;