import "./Appbar.css";
import "../../App.css";
import React, {useState} from "react";
import ShoppingCartButton from "./CartButton";
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export default function Appbar() {
    const [expanded, setExpanded] = useState(false);
    const closeMenu = () => setExpanded(false);

    return (
        <>
            <Navbar
                expanded={expanded}
                expand="lg"
                style={{ backgroundColor: '#f6430c' }}
                fixed="top"
                variant="dark"
            >
                <Container>
                    <Navbar.Brand>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                            Pizza Váltó
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        onClick={() => setExpanded(!expanded)}
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link onClick={closeMenu}>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to="/menu">
                                    Menü
                                </Link>
                            </Nav.Link>
                            <Nav.Link onClick={closeMenu}>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                                    Kezdőlap
                                </Link>
                            </Nav.Link>
                            <Nav.Link onClick={closeMenu}>
                                <Link style={{ textDecoration: 'none', color: 'white' }} to="/login">
                                    Bejelentkezés
                                </Link>
                            </Nav.Link>
                        </Nav>
                        <div id="eltol"> <Nav.Item ><ShoppingCartButton/></Nav.Item> </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ paddingTop: '40px' }}></div>
        </>
    );
}
