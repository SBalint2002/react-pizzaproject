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

const DataForm = () => {
    const {
        setZipCode,
        setAddress,
        setPhoneNumber,
    } = useUser();

        return (
            <div>
                <Container style={{color: "black"}}>
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
                                sx={{ width: "100%"}}
                            >
                                <InputLabel>
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
                                <InputLabel htmlFor="standard-adornment-password">
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
                                sx={{ width: "100%"}}
                                variant="standard"
                            >
                                <InputLabel htmlFor="standard-adornment-password">
                                    {" "}
                                    <LocalPhoneIcon/> Telefonszám
                                </InputLabel>
                                <Input className="dataInput"
                                    id="standard-adornment-password"
                                    type={"text"}
                                    placeholder={"(+3620 123 4567)"}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </FormControl>
                        </form>
                    </Box>
                </Container>
            </div>)
};

export default DataForm;
