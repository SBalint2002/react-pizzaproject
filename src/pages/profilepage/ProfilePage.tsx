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

export default function ProfilePage() {
    const [id, setId] = useState(0);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const {logOut} = useUser();

    const handleLogout = () => {
        logOut();
    };

    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const nameRegex = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű ]{2,}$/;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await authFetch("/user/data", {
                    method: "GET",
                });

                if (res.ok) {
                    const json = await res.json();
                    setId(json.id);
                    setLastName(json.last_name);
                    setFirstName(json.first_name);
                    setEmail(json.email);
                } else {
                    console.log("Invalid token");
                }
            } catch (error) {
                console.log("Sikertelen lekérés");
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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

        try {
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

    return (
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
                             margin: "auto",
                             mt: 6
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
                         minwidth: "30%",
                         alignItems: "center",
                         borderRadius: 2,
                         minHeight: "43vh",
                         display: "flex",
                         justifyContent: "center",
                         alignContent: "space-around",
                         mt: 10,
                     }}
                >
                    <form onSubmit={handleFormSubmit}>
                        <h1>Profil</h1>

                        {/* Vezetéknév */}

                        <FormControl fullWidth variant="standard" sx={{m: 1, width: "80%"}}>

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
                                color: "white",
                                backgroundColor: "#dc6b29",
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
                                color: "white",
                                backgroundColor: "#dc6b29",
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
