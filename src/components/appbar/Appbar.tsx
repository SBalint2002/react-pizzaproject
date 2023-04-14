import "./Appbar.css";
import "../../App.css";
import { useState } from "react";
import ShoppingCartButton from "./CartButton";
import {Link, useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PersonButton from "./ProfileButton";
import {authFetch} from "../../Util";
import {toast} from "react-toastify";
export default function Appbar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setExpanded(false);
  const OrderOnClick =  async () =>{
    closeMenu();
    try {
      const res = await authFetch("/user/data", {
        method: "GET",
      });
      if (res.ok) {
        navigate("/myorders");
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.warning("A rendeléseid megnézéséhez bejelentkezés szükséges.")
      navigate("/login");
    }
  }
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
              <Link to="/menu" className="Link" onClick={closeMenu}>  Menü </Link>
              <Link to="/myorders" className="Link" onClick={OrderOnClick}>Rendeléseim</Link>
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
