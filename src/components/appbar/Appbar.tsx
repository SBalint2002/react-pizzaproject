import "./Appbar.css";
import "../../App.css";
import React, { useEffect, useState } from "react";
import ShoppingCartButton from "./CartButton";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PersonButton from "./ProfileButton";
import LinkTo from "./LinkTo";

export default function Appbar() {
    const [expanded, setExpanded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const closeMenu = () => setExpanded(false);

    useEffect(() => {
        if (localStorage.getItem('Accesstoken')) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }

        console.log(localStorage.getItem('Accesstoken'));
    }, []);

    const LogOut = () => {
        localStorage.setItem("Accesstoken", "");
        localStorage.setItem("Refreshtoken", "");
    }

    return (
        <>
            <Navbar
                fixed="top"
                expanded={expanded}
                expand="lg"
                style={{ backgroundColor: '#f6430c' }}
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
                            <LinkTo to="/menu" text="Menü" closeMenu={closeMenu} />
                            <LinkTo to="/" text="Kezdőlap" closeMenu={closeMenu} />
                            <LinkTo to="/" text="Kijelentkezés" onClick={LogOut} closeMenu={closeMenu} />
                        </Nav>

                        <div id="eltol">
                            {loggedIn ?
                                <Nav.Item><PersonButton /></Nav.Item> :
                                <div style={{ width: '30px' }}></div>
                            }
                        </div>

                        <div><Nav.Item><ShoppingCartButton /></Nav.Item> </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{height:"80px"}}></div>
        </>
    );
}