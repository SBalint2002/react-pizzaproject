import "./Appbar.css";
import "../../App.css";
import { useState } from "react";
import ShoppingCartButton from "./CartButton";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PersonButton from "./ProfileButton";
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
            <Link style={{textDecoration: "none", color: "white" }} to="/">
              Pizza Váltó
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse className="Collapse" id="basic-navbar-nav">

            <div className="Center">
            <Nav>
              <Link to="/menu" className="Link" onClick={closeMenu}>Rendelés </Link>
              <Link to="/" className="Link" onClick={closeMenu}>Kezdőlap</Link>
            </Nav>
            </div>

            <div className="Right">
              <Nav.Item onClick={closeMenu}>
                <PersonButton />
              </Nav.Item>

              <Nav.Item onClick={closeMenu}>
                <ShoppingCartButton />
              </Nav.Item>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ height: "56px" }}></div>
    </>
  );
}
