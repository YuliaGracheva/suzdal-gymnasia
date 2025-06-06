import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import defaultLogo from '../img/image.png';
import YandexSearchForm from "./YandexSearchForm.js";
import { AccessibilityContext } from './context/AccessibilityContext.js';

export default function Header() {
    const [dropdowns, setDropdowns] = useState({
        info: false,
        education: false,
        about: false,
        reception: false,
        resurs: false
    });

    const [customLogo, setCustomLogo] = useState(null);
    const navigate = useNavigate();
    const { accessible, toggleAccessibilityMode } = useContext(AccessibilityContext);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data.logo) {
                    setCustomLogo(data.logo);
                }
            })
            .catch(err => {
                console.error("Ошибка загрузки настроек:", err);
            });
    }, []);

    const handleToggle = (menu) => {
        setDropdowns(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    const handleClose = (menu) => {
        setDropdowns(prev => ({
            ...prev,
            [menu]: false
        }));
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg"  className="header-main">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src={customLogo || defaultLogo}
                            height={30}
                            alt="Logo"
                            style={{ objectFit: 'contain', maxWidth: "100%" }}
                        />
                    </Navbar.Brand>
                    <p>Суздальская православная гимназия</p>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">Главная</Nav.Link>

                            <NavDropdown title="Основные сведения" show={dropdowns.info}
                                onMouseEnter={() => handleToggle('info')}
                                onMouseLeave={() => handleClose('info')}>

                                <NavDropdown.Item as={Link} to="/main-info/managment-bodies">Структура и органы управления</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/main-info/documents">Документы</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/main-info/accessible-environment">Доступная среда</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/main-info/paid-educational-services">Платные образовательные услуги</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/main-info/financial-economic-activity">Финансово-хозяйственная деятельность</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/main-info/vacant-place">Вакантные места</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/main-info/scholarships">Стипендии</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/main-info/international-coop">Международное сотрудничество</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/main-info/organisation-eat">Организация питания</NavDropdown.Item>

                                <NavDropdown title="Образование" drop="end" show={dropdowns.education}
                                    onMouseEnter={() => handleToggle('education')}
                                    onMouseLeave={() => handleClose('education')}>

                                    <NavDropdown.Item as={Link} to="/main-info/education/gia">ГИА</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/main-info/education/education-process">Образовательный процесс</NavDropdown.Item>
                                </NavDropdown>
                            </NavDropdown>

                            <NavDropdown title="О нас" show={dropdowns.about}
                                onMouseEnter={() => handleToggle('about')}
                                onMouseLeave={() => handleClose('about')}>
                                <NavDropdown.Item as={Link} to="/about/leadership">Руководство</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/about/contact">Контакты</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/about/olympiads">Олимпиады</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/about/message">Объявления</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/about/employee">Педагогический состав</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link as={Link} to="/news">Новости</Nav.Link>

                            <NavDropdown.Item as={Link} to="/process-reception">Процесс поступления</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/fuctional-gramm">Функциональная грамотность</NavDropdown.Item>

                            <Button
                                variant={accessible ? "light" : "outline-dark"}
                                onClick={toggleAccessibilityMode}
                                className="ms-3"
                            >
                                {accessible ? "Обычная версия" : "Версия для слабовидящих"}
                            </Button>

                        </Nav>
                        <div className="header-search-wrapper">
                            <YandexSearchForm />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
