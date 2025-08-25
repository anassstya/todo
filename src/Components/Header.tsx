import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/App.scss';

const Header = () => {
    return (
        <header className="header">
            <Navbar expand="md" bg="light" className="header__navbar shadow-sm px-4 w-100">
                <Container fluid>

                    <Navbar.Brand href="#home" className="header__brand d-flex align-items-center gap-2">
                        <img
                            alt="logo"
                            src={logo}
                            className="header__logo"
                        />
                        <p className="header__title my-0">Organize your life</p>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="header-menu" className="header__toggle" />

                    <Navbar.Collapse
                        id="header-menu"
                        className="header__collapse justify-content-md-end justify-content-center"
                    >

                        <Nav className="header__nav gap-3">
                            <Nav.Link
                                as={NavLink as any}
                                to="/"
                                className="header__link"
                                end
                            >
                                Задачи
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink as any}
                                to="/stats"
                                className="header__link"
                            >
                                Статистика
                            </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
