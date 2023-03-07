import React, {useState} from "react";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ShoppingCartButton = () => {
    return (
        <Button style={{color: "inhereted"}}><ShoppingCartIcon style={{color: 'white'}}/></Button>
    )
}

export default ShoppingCartButton;