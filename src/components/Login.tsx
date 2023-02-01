import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box
      sx={{
        flexWrap: "wrap",
        flexDirection: "column",
        width: '30%',
        '@media (max-width: 1200px)': {
          width: '40%',
        },
        '@media (max-width: 1000px)': {
          width: '50%',
        },
        '@media (max-width: 800px)': {
          width: '60%',
        },
        '@media (max-width: 600px)': {
          width: '75%',
        },
        Minwidth: '30%', 
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
      <form>
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

        <Button
          variant="contained"
          sx={{ mt: 5, mb: 5 }}
          style={{ color: "white", backgroundColor: "#dc6b29", width: "45ch" }}
        >
          Bejelentkezés
        </Button>
        <p>Még nem regisztráltál? <a href="./register">Regisztrálás</a></p>
      </form>
    </Box>
  );
}
