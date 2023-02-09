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
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Adatok
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Gomb megnyomása után POST és redirect
  let navigate = useNavigate();

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    const data: User = { email, password };
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      UserProfile.setToken(json["jwttoken"]);
      console.log(json);
      console.log(UserProfile.getToken());
      navigate("/welcomepage");
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
            Email cím
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
          <InputLabel htmlFor="standard-adornment-password">Jelszó</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FlatButton
          type="submit"
          variant="contained"
          sx={{ mt: 5, mb: 5 }}
          style={{ color: "white", backgroundColor: "#dc6b29", width: "45ch" }}
        >
          Bejelentkezés
        </FlatButton>
        <p>
          Még nem regisztráltál? <a href="./register">Regisztrálás</a>
        </p>
      </form>
    </Box>
  );
}
