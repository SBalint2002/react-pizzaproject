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

export default function Register() {

  //Két jelszó kezelése
  const [showPassword1, setShowPassword1] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword1((show) => !show);

  const [showPassword2, setShowPassword2] = React.useState(false);
  const handleClickShowPasswordAgain = () => setShowPassword2((show) => !show);


  
  // Adatok
    const [, setResponse] = React.useState("");
    const [last_name, setLastName] = React.useState("");
    const [first_name, setFirstName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // Gomb megnyomása után POST és redirect
    let navigate = useNavigate(); 
    const handleClick = async () => {
      try{
        const res = await fetch("http://localhost:8080/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
          }),
        });

        const json = await res.json();
        setResponse(json.message)
      } catch (error){
        setResponse("Error: {error.message}");
      }

      let path = './Menu'; 
      navigate(path);
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

        <FormControl
          required
          fullWidth
          variant="standard"
          sx={{ m: 1, width: "40ch" }}
        >
          <InputLabel htmlFor="standard-adornment-password">
            Vezetéknév
          </InputLabel>
          <Input
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "Vezetéknév",
            }}
          />
        </FormControl>

        {/* Keresztnév */}

        <FormControl
          required
          fullWidth
          variant="standard"
          sx={{ m: 1, width: "40ch" }}
        >
          <InputLabel htmlFor="standard-adornment-password">
            Keresztnév
          </InputLabel>
          <Input
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "Keresztnév",
            }}
          />
        </FormControl>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="standard-weight-helper-text"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword1 ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword1 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {/* Jelszó mégegyszer */}

        <FormControl
          required
          fullWidth
          sx={{ m: 1, width: "40ch" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password">
            Jelszó újra
          </InputLabel>
          <Input
            type={showPassword2 ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordAgain}
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
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
          Van már fiókod? <a href="./login">Bejelentkezés</a>
        </p>
      </form>
    </Box>
  );
};
