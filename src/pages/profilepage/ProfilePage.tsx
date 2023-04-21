import * as React from "react";
import {authFetch} from "../../Util";
import "./ProfilePage.css";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useUser} from "../../components/Contexts/UserContextProvider";
import Container from "react-bootstrap/Container";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import PersonIcon from "@mui/icons-material/Person";
import Input from "@mui/material/Input";
import EmailIcon from "@mui/icons-material/Email";
import FlatButton from "@mui/material/Button";
import logo from "./keszprofil.png";

// A felhasználó profilja
export default function ProfilePage() {

    // Adatok tárolására alkalmas hook-ok
    const [id, setId] = useState(0);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [displayLastName, setDisplayLastName] = useState("");
    const [displayFirstName, setDisplayFirstName] = useState("");
    const [email, setEmail] = useState("");
    const {logOut} = useUser(); // Kijelentkezés függvény lekérése a ProductContext-ből

    const handleLogout = () => { // Kijelentkezés kattintásra
        logOut();
    };

    // Regex szabályok
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const nameRegex = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű ]{2,50}$/;

    const fetchData = async () => { // Felhasználó adatinak lekérése
        try {
            const res = await authFetch("/user/data", {
                method: "GET",
            });

            if (res.ok) {
                const json = await res.json();
                setId(json.id);
                setLastName(json.last_name);
                setFirstName(json.first_name);
                setDisplayFirstName(json.first_name);
                setDisplayLastName(json.last_name);
                setEmail(json.email);
            } else {
                console.log("Invalid token");
            }
        } catch (error) {
            console.log("Sikertelen lekérés");
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Felhasználó adatainak módosítása
        e.preventDefault();
        fetchData();

        // Adatok ellenőrzése Regex-ek alapján
        if (!nameRegex.test(firstName)) {
            toast.error("Hibás keresztnév formátum");
            return;
        }
        if (!nameRegex.test(lastName)) {
            toast.error("Hibás vezetéknév formátum");
            return;
        }
        if (!emailRegex.test(email)) {
            toast.error("Hibás email formátum");
            return;
        }

        try { // Módosított adatok elküldése
            const res = await authFetch(`/user/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                }),
            });

            if (res.ok) {
                toast.success("Adatok sikeresen módosítva!");
            } else {
                toast.error("Hiba!");
            }
        } catch (error) {
            toast.error("Hiba!");
            console.log(error);
        }
    };

    return ( // Form megjelenítése
        <div className="profilebody">
            <Container>
                <Box className="box"
                     sx={{
                         flexWrap: "wrap",
                         flexDirection: "column",
                         width: "35%",
                         "@media (max-width: 1200px)": {
                             width: "40%",
                         },
                         "@media (max-width: 1000px)": {

                             mt: 10
                         },
                         "@media (max-width: 991px)": {
                             width: "53%",
                         },
                         "@media (max-width: 767px)": {
                             width: "70%",
                         },
                         "@media (max-width: 600px)": {
                             width: "80%",
                         },
                         padding: "5px",
                         margin: "auto",
                         alignItems: "center",
                         borderRadius: 2,
                         minHeight: "45vh",
                         display: "flex",
                         justifyContent: "center",
                         alignContent: "space-around",
                         mt: 10,
                     }}
                >
                    <form onSubmit={handleFormSubmit}>

                        <div>
                            <img style={{width: "50px"}} src={logo} alt="logo"/>

                            <h1>Profil</h1>

                            <h3>{displayLastName} {displayFirstName} </h3>
                        </div>

                        {/* Vezetéknév */}

                        <FormControl fullWidth variant="standard" sx={{m: 1, width: "80%", mt: 5}}>

                            <InputLabel style={{color: "white"}}><PersonIcon/> Vezetéknév</InputLabel>
                            <Input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                aria-describedby="standard-weight-helper-text"
                                inputProps={{
                                    "aria-label": "Vezetéknév",
                                }}
                            />
                        </FormControl>

                        {/* Keresztnév */}

                        <FormControl fullWidth variant="standard" sx={{m: 1, width: "80%"}}>
                            <InputLabel style={{color: "white"}}><PersonIcon/> Keresztnév</InputLabel>
                            <Input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                aria-describedby="standard-weight-helper-text"
                                inputProps={{
                                    "aria-label": "Keresztnév",
                                }}
                            />
                        </FormControl>

                        {/* Email cím */}

                        <FormControl fullWidth variant="standard" sx={{m: 1, width: "80%"}}>
                            <InputLabel style={{color: "white"}}> <EmailIcon/> Email cím</InputLabel>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-describedby="standard-weight-helper-text"
                                inputProps={{
                                    "aria-label": "Emailcím",
                                }}
                            />
                        </FormControl>

                        <FlatButton
                            type="submit"
                            variant="contained"
                            sx={{mt: 5}}
                            style={{
                                color: "black",
                                backgroundColor: "#d2cdcd",
                                width: "80%",
                            }}
                        >
                            Módosítás
                        </FlatButton>

                        <FlatButton
                            onClick={handleLogout}
                            variant="contained"
                            sx={{mt: 2, mb: 3}}
                            style={{
                                color: "black",
                                backgroundColor: "#d2cdcd",
                                width: "80%",
                            }}
                        >
                            Kijelentkezés
                        </FlatButton>
                    </form>
                </Box>
            </Container>
        </div>
    )
}
