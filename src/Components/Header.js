import React, { useState, useContext } from "react";
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from '../img/image.png';
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "./SearchContext";

export default function Header() {
    const [dropdowns, setDropdowns] = useState({
        info: false,
        education: false,
        about: false,
        reception: false,
        resurs: false
    });

    const { setQuery } = useContext(SearchContext);
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(input);
        navigate("/search");
    };

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
            <Navbar collapseOnSelect expand="md" className="header-main">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} height={30} width={30} alt="Logo" />
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

                            <NavDropdown title="Прием" show={dropdowns.reception}
                                onMouseEnter={() => handleToggle('reception')}
                                onMouseLeave={() => handleClose('reception')}>
                                <NavDropdown.Item as={Link} to="/reception/process-reception">Процесс</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Ресурсы" show={dropdowns.resurs}
                                onMouseEnter={() => handleToggle('resurs')}
                                onMouseLeave={() => handleClose('resurs')}>
                                <NavDropdown.Item as={Link} to="/resurs/fuctional-gramm">Функциональная грамотность</NavDropdown.Item>
                            </NavDropdown>

                            <Form className="d-flex" onSubmit={handleSearch}>
                                <FormControl
                                    type="text"
                                    placeholder="Поиск"
                                    className="mr-sm-2"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <Button type="submit" variant="outline-info">Поиск</Button>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
