import "./Appbar.css";
import "../../App.css";
import React, {useContext, useState} from "react";
import ShoppingCartButton from "./CartButton";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PersonButton from "./ProfileButton";
import LinkTo from "./LinkTo";
import {useUser} from "../userContext/UserContextProvider";

export default function Appbar() {
    const [expanded, setExpanded] = useState(false);
    const { user, logOut } = useUser();

    const handleLogout = () => {
        logOut();
    };
    const closeMenu = () => setExpanded(false);
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
                            <LinkTo to="/" text="Kijelentkezés" onClick={handleLogout} closeMenu={closeMenu} />
                        </Nav>

                        <div id="eltol">
                            {user ?
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