import "./Appbar.css";
import "../../App.css";
import {useState} from "react";
import ShoppingCartButton from "./CartButton";
import {Link, useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PersonButton from "./ProfileButton";
import {authFetch} from "../../Util";
import {toast} from "react-toastify";

/**
 * Az Appbar komponens a navigációs sávot jeleníti meg az alkalmazásban
 *
 * @component
 * @return {JSX.Element}
 */

export default function Appbar() {

    /**
     * Állapot változó, ami azt jelzi, hogy az elmenük nyitva vagy összezárva van
     *
     * @type {[boolean, function]}
     */
    const [expanded, setExpanded] = useState(false);

    /**
     * Oldalak közti navigáció
     *
     * @type {function}
     */
    const navigate = useNavigate();

    /**
     *  Összecsukott állapotban bezárja a menüt
     *
     *  @type {function}
     */
    const closeMenu = () => setExpanded(false);


    /**
     * A Rendeléseim gombra kattintás eseménykezelője
     * Authentikált kérést küldünk a szervernek, hogy megnézzük, hogy a felhasználó be van-e jelentkezve
     *
     * @type {function}
     */
    const OrderOnClick = async () => {
        closeMenu();
        try { //
            const res = await authFetch("/user/data", {
                method: "GET",
            });
            if (res.ok) { // Ha a válasz rendben van, akkor átirányítjuk a felhasználót a Rendeléseim oldalra
                navigate("/myorders");
            } else { // Ha a válasz nincs rendben van, akkor átirányítjuk a felhasználót a Bejelentkezés oldalra
                navigate("/login");
            }
        } catch (error) {
            toast.warning("A rendeléseid megnézéséhez bejelentkezés szükséges.") // Ha hiba történik, akkor toast üzenetet jelenítünk meg és átirányítjuk a felhasználót a Bejelentkezés oldalra
            navigate("/login");
        }
    }
    /**
     * Navigációs sáv megjelenítése
     *
     * @return {JSX.Element}
     */
    return (
        <>
            <Navbar
                fixed="top"
                expanded={expanded}
                expand="lg"
                style={{backgroundColor: "#000"}}
                variant="dark"
            >
                <Container>
                    <Navbar.Brand>
                        <Link onClick={closeMenu} style={{textDecoration: "none", color: "white"}} to="/">
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
                                <Link to="/menu" className="Link" onClick={closeMenu}>Menü</Link>
                                <Link to="/myorders" className="Link" onClick={OrderOnClick}>Rendeléseim</Link>
                            </Nav>
                        </div>

                        <div className="Right">
                            <Nav.Item onClick={closeMenu}>
                                <PersonButton/>
                            </Nav.Item>

                            <Nav.Item onClick={closeMenu}>
                                <ShoppingCartButton/>
                            </Nav.Item>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{height: "56px"}}></div>
        </>
    );
}
