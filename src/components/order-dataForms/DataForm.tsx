import {useUser} from "../Contexts/UserContextProvider";
import Container from "react-bootstrap/Container";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import * as React from "react";
import "./OrderForm.css"

// Rendeléshez szükséges adatok bekérésére szolgáló komponens

const DataForm = () => { // UserContextProvider-ből kinyerjük az adatok állapotaihoz tartozó frissítő metódusokat
    const {
        setZipCode,
        setAddress,
        setPhoneNumber,
    } = useUser();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Telefonszám változásának eseménykezelője, amely hozzáadja a +36 előtagot, ha az nincs megadva
        const {value} = event.target;
        if (value.startsWith("+36")) {
            setPhoneNumber(value);
        } else {
            setPhoneNumber("+36" + value);
        }
    };

    return ( /* // Komponens felépítése és visszaadása */
        <div>
            <Container style={{color: "white"}}>
                <Box className=""
                     sx={{
                         flexWrap: "wrap",
                         flexDirection: "column",
                         width: "100%",
                         padding: "5px",
                         minWidth: "30%",
                         alignItems: "center",
                         borderRadius: 2,
                         minHeight: "30vh",
                         display: "flex",
                         justifyContent: "center",
                         alignContent: "space-around",
                     }}
                >
                    <form>
                        <h2>Rendelési&nbsp;adatok</h2>
                        <FormControl
                            required
                            variant="standard"
                            sx={{width: "100%"}}
                        >
                            <InputLabel style={{color: "white"}}>
                                <LocationCityIcon/> Irányítószám
                            </InputLabel>
                            <Input className="dataInput"
                                   aria-describedby="standard-weight-helper-text"
                                   onChange={(e) => setZipCode(e.target.value)}
                                   inputProps={{
                                       maxLength: 4,
                                   }}
                            />
                        </FormControl>

                        <FormControl
                            required
                            sx={{width: "100%"}}
                            variant="standard"
                        >
                            <InputLabel style={{color: "white"}}>
                                {" "}
                                <HomeIcon/> Város, Utca, Házszám
                            </InputLabel>
                            <Input className="dataInput"
                                   id="standard-adornment-password"
                                   type={"text"}
                                   onChange={(e) => setAddress(e.target.value)}
                            />
                        </FormControl>
                        <FormControl
                            required
                            sx={{width: "100%"}}
                            variant="standard"
                        >
                            <InputLabel style={{color: "white"}}>
                                {" "}
                                <LocalPhoneIcon/> Telefonszám
                            </InputLabel>
                            <Input className="dataInput"
                                   id="standard-adornment-password"
                                   type={"text"}
                                   placeholder={"(+36 20 123 4567)"}
                                   onChange={handleChange}
                            />
                        </FormControl>
                    </form>
                </Box>
            </Container>
        </div>)
};

export default DataForm;
