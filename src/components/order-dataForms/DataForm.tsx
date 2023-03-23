import React from "react";
import {useUser} from "../Contexts/UserContextProvider";
import PhoneInput from "react-phone-number-input/input";

const DataForm = () => {
    const {
        zipCode,
        setZipCode,
        city,
        setCity,
        street,
        setStreet,
        phoneNumber,
        setPhoneNumber
    } = useUser();

    return(
        <div style={{border: "2px solid black", width:"40%", margin:"auto", padding: "7px", textAlign: "right"}}>
            <label htmlFor="zip">Irányítószám <input onChange={(e)=>setZipCode(e.target.value)} id="zip" type="text" max={4}/></label> <br/>
            <label htmlFor="city">Város <input onChange={(e)=>setCity(e.target.value)} id="city" type="text"/></label> <br/>
            <label htmlFor="street">Utca, házszám <input onChange={(e)=>setStreet(e.target.value)} id="street" type="text" /></label> <br/>
            <label htmlFor="phoneNum">Telefonszám +36<PhoneInput defaultCountry={"HU"} onChange={setPhoneNumber}/></label> <br/>
        </div>
    )
}

export default DataForm;