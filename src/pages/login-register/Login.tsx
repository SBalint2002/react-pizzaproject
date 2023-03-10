import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FlatButton from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const [loginError, setLoginError] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Adatok
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Gomb megnyomása után POST és redirect
  let navigate = useNavigate();

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: User = { email, password };

      setLoginError("");
      try {
          const res = await fetch("http://localhost:8080/user/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
          });
          if (res.ok) {
              const json = await res.json();
              const accesstoken = json["jwttoken"];
              const refreshtoken = json["refreshToken"];

              console.log(json);

              localStorage.setItem("Accesstoken", accesstoken);
              localStorage.setItem("Refreshtoken", refreshtoken);
              navigate("/");
          }else{
              setLoginError("Felhasználónév és jelszó páros nem megfelelő!");
          }
      } catch (error) {
          console.log(error);
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
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F8F8FF",
        margin: "auto",
        alignContent: "space-around",
        mt: 10,
      }}
    >
      <form onSubmit={handleClick}>
        <h1>Bejelentkezés</h1>

        {/* Email cím */}

        <FormControl
          required
          fullWidth
          variant="standard"
          sx={{ m: 1, width: "40ch" }}
        >
          <InputLabel htmlFor="standard-adornment-password">
            <EmailIcon/> Email cím
          </InputLabel>
          <Input
            aria-describedby="standard-weight-helper-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{
              "aria-label": "Emailcím",
            }}
          />
        </FormControl>

        {/* Jelszó */}

        <FormControl
          required
          fullWidth
          sx={{ m: 1, width: "40ch" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password"> <LockIcon/> Jelszó</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        {loginError && (
          <Box color="error.main">
            <Box id="login-error-text">{loginError}</Box>
          </Box>
        )}
        <FlatButton
          type="submit"
          variant="contained"
          sx={{ mt: 5, mb: 5 }}
          style={{ color: "white", backgroundColor: "#dc6b29", width: "45ch" }}
        >
          Bejelentkezés
        </FlatButton>
        <p>
          Még nem regisztráltál? <Link to="./Register">Regisztrálás</Link>
        </p>
      </form>
    </Box>
  );
}
