import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";

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
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            requests: [],
            socialLinks: {
                vk: '',
                ok: '',
                telegram: '',
                youtube: ''
            },
            contactInfo: {
                name: '',
                address: '',
                phones: '',
                email: ''
            },
            recaptchaToken: null,
            useRecaptcha: false
        };
        this.recaptchaRef = React.createRef();
    }

    handleRecaptchaChange = (token) => {
        console.log("✔ Получен токен от reCAPTCHA:", token);
        this.setState({ recaptchaToken: token });
    };

    componentDidMount() {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (!data) return;
    
                const contacts = JSON.parse(data.contacts || "{}");
                const socialLinks = JSON.parse(data.socialLinks || "{}");
    
                this.setState({
                    contactInfo: contacts,
                    socialLinks,
                    useRecaptcha: !!data.useRecaptcha
                });
            })
            .catch((err) => {
                console.error("Ошибка при загрузке настроек:", err);
            });
    }    

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { name, phone, useRecaptcha, recaptchaToken } = this.state;

        if (useRecaptcha && !recaptchaToken) {
            alert("Подтвердите, что вы не робот.");
            return;
        }

        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, recaptchaToken, useRecaptcha })
            });

            if (response.ok) {
                alert("Заявка отправлена успешно!");
                this.setState({ name: '', phone: '', recaptchaToken: null });
                if (this.recaptchaRef.current) {
                    this.recaptchaRef.current.reset();
                }
            } else {
                const result = await response.json();
                alert(result.error || "Ошибка при отправке.");
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            alert("Ошибка отправки. Попробуйте позже.");
        }
    };

    render() {
        const { socialLinks, contactInfo, useRecaptcha } = this.state;

        return (
            <footer className="footer">
                <div className="purple-footer-contact">
                    <div className="contact-info">
                        <h2 className="footer-h">Наши контакты</h2>
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

                        <div className="footer-social-links">
                            <h3>Мы в соцсетях</h3>
                            <ul>
                                {socialLinks.vk && (
                                    <li>
                                        <a href={socialLinks.vk} target="_blank" rel="noopener noreferrer" className="social-link">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 30 30">
                                                <defs>
                                                    <clipPath id="vkClip">
                                                        <path d="M2.371094 2.394531 L26 2.394531 L26 26 L2.371094 26 Z" />
                                                    </clipPath>
                                                </defs>
                                                <g clipPath="url(#vkClip)">
                                                    <path
                                                        fill="#4C75A3"
                                                        d="M 13.496094 2.597656 C 10.730469 2.804688 8.210938 3.941406 6.230469 5.875 C 3.625 8.414062 2.375 12.011719 2.839844 15.625 C 3.414062 20.140625 6.601562 23.902344 10.976562 25.234375 C 14.359375 26.265625 18.125 25.652344 20.992188 23.613281 C 24.515625 21.101562 26.347656 16.9375 25.804688 12.675781 C 25.230469 8.15625 22.042969 4.394531 17.667969 3.0625 C 16.304688 2.660156 14.914062 2.503906 13.496094 2.601562 Z M 14.378906 9.773438 C 14.96875 9.832031 15.265625 9.925781 15.398438 10.097656 C 15.433594 10.144531 15.488281 10.261719 15.523438 10.359375 C 15.589844 10.5625 15.59375 10.792969 15.550781 12.527344 C 15.523438 13.609375 15.539062 13.945312 15.628906 14.183594 C 15.726562 14.460938 15.960938 14.585938 16.164062 14.480469 C 16.347656 14.382812 16.777344 13.914062 17.058594 13.492188 C 17.707031 12.53125 18.101562 11.789062 18.574219 10.640625 C 18.671875 10.414062 18.800781 10.261719 18.933594 10.226562 C 18.984375 10.210938 19.742188 10.199219 20.667969 10.195312 L 22.308594 10.191406 L 22.449219 10.25 C 22.632812 10.304688 22.714844 10.429688 22.695312 10.621094 C 22.695312 10.980469 22.320312 11.722656 21.675781 12.625 C 21.585938 12.75 21.253906 13.195312 20.933594 13.613281 C 20.230469 14.535156 20.078125 14.75 19.972656 14.976562 C 19.835938 15.257812 19.871094 15.492188 20.082031 15.765625 C 20.140625 15.84375 20.453125 16.15625 20.769531 16.460938 C 21.65625 17.3125 22.058594 17.757812 22.386719 18.246094 C 22.621094 18.601562 22.714844 18.859375 22.675781 19.085938 C 22.65625 19.207031 22.535156 19.355469 22.394531 19.425781 C 22.230469 19.511719 21.976562 19.527344 20.582031 19.546875 L 19.261719 19.5625 L 19.046875 19.492188 C 18.503906 19.3125 18.140625 19.007812 17.316406 18.054688 C 16.859375 17.527344 16.519531 17.265625 16.285156 17.265625 C 16.070312 17.265625 15.789062 17.550781 15.679688 17.910156 C 15.597656 18.148438 15.570312 18.335938 15.542969 18.75 C 15.515625 19.246094 15.457031 19.355469 15.15625 19.480469 C 15.046875 19.53125 13.683594 19.546875 13.324219 19.507812 C 12.601562 19.429688 11.933594 19.199219 11.269531 18.8125 C 10.304688 18.25 9.714844 17.742188 9.082031 16.9375 C 7.984375 15.53125 7.234375 14.335938 6.324219 12.535156 C 5.976562 11.832031 5.558594 10.925781 5.492188 10.707031 C 5.425781 10.484375 5.519531 10.300781 5.738281 10.230469 C 5.8125 10.207031 6.234375 10.195312 7.191406 10.179688 L 8.539062 10.167969 L 8.695312 10.226562 C 8.941406 10.320312 9.042969 10.445312 9.214844 10.851562 C 9.359375 11.195312 10.136719 12.753906 10.378906 13.191406 C 10.628906 13.628906 10.890625 14 11.121094 14.214844 C 11.402344 14.492188 11.527344 14.558594 11.726562 14.542969 C 11.894531 14.527344 11.9375 14.488281 12.042969 14.261719 C 12.296875 13.714844 12.335938 11.867188 12.109375 11.140625 C 11.980469 10.726562 11.785156 10.570312 11.246094 10.453125 C 11.152344 10.433594 11.152344 10.398438 11.238281 10.273438 C 11.445312 9.976562 11.816406 9.832031 12.523438 9.773438 C 12.910156 9.742188 14.058594 9.738281 14.375 9.773438 Z M 14.378906 9.773438"
                                                    />
                                                </g>
                                            </svg>
                                            <span>ВКонтакте</span>
                                        </a>
                                    </li>
                                )}
                                {socialLinks.telegram && (
                                    <li>
                                        <a href={socialLinks.telegram} rel="noopener noreferrer" target="_blank">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                                            </svg>
                                            <span>Telegram</span>
                                        </a>
                                    </li>
                                )}
                                {socialLinks.youtube && (
                                    <li>
                                        <a href={socialLinks.youtube} rel="noopener noreferrer" target="_blank">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
                                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                                                <span>YouTube</span>
                                            </svg>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
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
                                <p>Региональная организация «ОМОРОФ-СУВОРОВСКИЙ ПРИЗЫВ»</p>
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
                                <form onSubmit={this.handleSubmit}>
                                    <label htmlFor="name">Ваше имя:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <label htmlFor="phone">Номер телефона:</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    {useRecaptcha && (
                                        <ReCAPTCHA
                                            ref={this.recaptchaRef}
                                            sitekey="6Ld7hzMrAAAAACCRlvHn1dGhfufHv2vXWxS4EXE5"
                                            onChange={this.handleRecaptchaChange}
                                            onErrored={() => {
                                                alert("Ошибка загрузки reCAPTCHA. ");
                                            }}
                                        />
                                    )}
                                    <button type="submit" className="call-me-button">Запросить звонок</button>
                                </form>
                            </div>
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