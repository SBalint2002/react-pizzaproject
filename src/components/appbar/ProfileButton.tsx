import React, { useState } from "react";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import {Link} from "react-router-dom";

const PersonButton=()=>{
    const [loggedIn,setLoggedin] = useState(false)

    const userbutton = ()=>{
        if (loggedIn){
            return <Link to="/welcomepage"><PersonIcon style={{color:'white'}}/></Link>
        }else{
            return <Link to="/login"><PersonIcon style={{color:'white'}}/></Link>
        }
    }

    return(
        <Button style={{color: "inhereted"}}>{userbutton()}</Button>
    )
}

export default PersonButton;