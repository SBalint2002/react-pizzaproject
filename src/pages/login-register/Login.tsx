import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FlatButton from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import {toast} from "react-toastify";
import "./LogReg.css";
import Container from "react-bootstrap/Container";

interface User {
    email: string;
    password: string;
}

export default function Login() {
    // Adatok
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // Gomb megnyomása után POST és redirect
    let navigate = useNavigate();

    const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: User = {email, password};

        try {
            const res = await fetch("/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const json = await res.json();
                const accesstoken = json["accessToken"];
                const refreshtoken = json["refreshToken"];

                localStorage.setItem("Accesstoken", accesstoken);
                localStorage.setItem("Refreshtoken", refreshtoken);
                navigate("/");
            } else {
                toast.error("Felhasználónév és jelszó páros nem megfelelő!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="logBody">
            <Container className="logregcontainer">
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
                             mt: 10,
                         },
                         "@media (max-width: 991px)": {
                             width: "54%",
                         },
                         "@media (max-width: 767px)": {
                             width: "73%",
                         },
                         "@media (max-width: 600px)": {
                             width: "80%",
                         },
                         padding: "5px",
                         minWidth: "30%",
                         alignItems: "center",
                         borderRadius: 2,
                         minHeight: "40vh",
                         display: "flex",
                         justifyContent: "center",
                         alignContent: "space-around",
                         mt: 10,
                     }}
                >
                    <form onSubmit={handleClick}>
                        <h1>Bejelentkezés</h1>

                        {/* Email cím */}

                        <FormControl
                            required
                            variant="standard"
                            sx={{m: 1, width: "80%"}}
                        >
                            <InputLabel style={{color: "white"}} htmlFor="standard-adornment-email">
                                <EmailIcon/> Email cím
                            </InputLabel>
                            <Input
                                aria-describedby="standard-weight-helper-text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                inputProps={{
                                    "aria-label": "Emailcím",
                                    color: "white"
                                }}
                            />
                        </FormControl>

                        {/* Jelszó */}

                        <FormControl
                            required
                            sx={{m: 1, width: "80%"}}
                            variant="standard"
                        >
                            <InputLabel style={{color: "white"}} htmlFor="standard-adornment-password">
                                {" "}
                                <LockIcon/> Jelszó
                            </InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={"password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FlatButton
                            type="submit"
                            variant="contained"
                            sx={{mt: 5, mb: 5}}
                            style={{color: "white", backgroundColor: "#dc6b29", width: "80%"}}
                        >
                            Bejelentkezés
                        </FlatButton>
                        <p>
                            Még nem regisztráltál? <Link to="/register">Regisztrálás</Link>
                        </p>
                    </form>
                </Box>
            </Container>
        </div>
    );
}
