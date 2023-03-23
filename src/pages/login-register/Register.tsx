import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FlatButton from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export default function Register() {
  //Két jelszó kezelése
  const showPassword1 = React.useState(false);

  const showPassword2 = React.useState(false);

  // Adatok
  const [last_name, setLastName] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  //Regex validation patterns
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const nameRegex = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{2,}$/;

  // Regex validation error messages
  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [password2Error, setPassword2Error] = React.useState("");

  // Gomb megnyomása után POST és redirect
  let navigate = useNavigate();

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Reset the error messages

    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");

    // Validate inputs
    if (!nameRegex.test(last_name)) {
      setLastNameError(
        "Vezetéknév legalább 2 betű és csak betűket tartalmazhat"
      );
    } else if (!nameRegex.test(first_name)) {
      setFirstNameError(
        "Keresztnév legalább 2 betű és csak betűket tartalmazhat"
      );
    } else if (!emailRegex.test(email)) {
      setEmailError("nem megfelelő e-mail formátum");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "A jelszó legalább 8 karakteres és tartalmaznia kell számot is"
      );
    } else if (password !== password2) {
      setPassword2Error("A két jelszó nem egyezik!");
    } else {
      // POST the user data
        const data: User = { first_name, last_name, email, password };
        try {
            const res = await fetch("http://localhost:8080/user/register", {
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
                console.log(refreshtoken);
                localStorage.setItem("Accesstoken", accesstoken);
                localStorage.setItem("Refreshtoken", refreshtoken);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }
  };

  return (
    <Box
      sx={{
        flexWrap: "wrap",
        flexDirection: "column",
        width: "30%",
        "@media (max-width: 1200px)": {
          width: "40%",
        },
        "@media (max-width: 1000px)": {
          width: "50%",
        },
        "@media (max-width: 800px)": {
          width: "60%",
        },
        "@media (max-width: 600px)": {
          width: "75%",
        },
        Minwidth: "30%",
        alignItems: "center",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "black.800" : "black.300",
        borderRadius: 2,
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F8F8FF",
        margin: "auto",
        alignContent: "space-around",
        mt: 10,
      }}
    >
      <form onSubmit={handleClick}>
        <h1>Regisztráció</h1>

        {/* Vezetéknév */}

        <FormControl fullWidth variant="standard" sx={{ m: 1, width: "40ch" }}>

          <InputLabel><PersonIcon/> Vezetéknév</InputLabel>
          <Input
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "Vezetéknév",
            }}
          />
          {lastNameError && (
            <Box color="error.main">
              <Box id="last-name-error-text">{lastNameError}</Box>
            </Box>
          )}
        </FormControl>

        {/* Keresztnév */}

        <FormControl fullWidth variant="standard" sx={{ m: 1, width: "40ch" }}>
          <InputLabel><PersonIcon/> Keresztnév</InputLabel>
          <Input
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "Keresztnév",
            }}
          />
          {firstNameError && (
            <Box color="error.main">
              <Box id="first-name-error-text">{firstNameError}</Box>
            </Box>
          )}
        </FormControl>

        {/* Email cím */}

        <FormControl fullWidth variant="standard" sx={{ m: 1, width: "40ch" }}>
          <InputLabel> <EmailIcon/> Email cím</InputLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "Emailcím",
            }}
          />
          {emailError && (
            <Box color="error.main">
              <Box id="email-error-text">{emailError}</Box>
            </Box>
          )}
        </FormControl>

        {/* Jelszó */}

        <FormControl fullWidth sx={{ m: 1, width: "40ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password"> <LockIcon/> Jelszó</InputLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword1 ? "text" : "password"}
          />
          {passwordError && (
            <Box color="error.main">
              <Box id="password-error-text">{passwordError}</Box>
            </Box>
          )}
        </FormControl>

        {/* Jelszó mégegyszer */}

        <FormControl fullWidth sx={{ m: 1, width: "40ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password"><LockIcon/> Jelszó újra</InputLabel>
          <Input
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            type={showPassword2 ? "text" : "password"}
          />
          {password2Error && (
            <Box color="error.main">
              <Box id="password2-error-text">{password2Error}</Box>
            </Box>
          )}
        </FormControl>

        <FlatButton
          type="submit"
          variant="contained"
          sx={{ mt: 5, mb: 5 }}
          style={{
            color: "white",
            backgroundColor: "#dc6b29",
            width: "45ch",
          }}
        >
          Regisztrálás
        </FlatButton>
        <p>
          Van már fiókod? <Link to="./Login">Bejelentkezés</Link>
        </p>
      </form>
    </Box>
  );
}