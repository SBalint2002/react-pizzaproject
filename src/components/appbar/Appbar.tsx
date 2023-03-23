import "./Appbar.css";
import "../../App.css";
import { useState } from "react";
import ShoppingCartButton from "./CartButton";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PersonButton from "./ProfileButton";
import LinkTo from "./LinkTo";

export default function Appbar() {
  const [expanded, setExpanded] = useState(false);

  const closeMenu = () => setExpanded(false);
  return (
    <>
      <Navbar
        fixed="top"
        expanded={expanded}
        expand="lg"
        style={{ backgroundColor: "#000" }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Pizza Váltó
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkTo to="/menu" text="Rendelés" closeMenu={closeMenu} />
              <LinkTo to="/" text="Kezdőlap" closeMenu={closeMenu} />
            </Nav>

            <div id="eltol">
              <Nav.Item onClick={closeMenu}>
                <PersonButton />
              </Nav.Item>
              <div style={{ width: "30px" }}></div>
            </div>
            <div>
              <Nav.Item onClick={closeMenu}>
                <ShoppingCartButton />
              </Nav.Item>{" "}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ height: "56px" }}></div>
    </>
  );
}
