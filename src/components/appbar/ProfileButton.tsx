import React, { useState } from "react";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import { authFetch } from "../../Util";
import { useNavigate } from "react-router-dom";

const PersonButton = () => {
    const navigate = useNavigate();

    const Click = async () => {
        try {
            const res = await authFetch("http://localhost:8080/user/data", {
                method: "GET",
            });
            if (res.ok) {
                navigate("/welcomepage");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.log("Sikertelen lekérés");
            console.log(error);
            navigate("/login");
        }
    };

    return (
        <Button onClick={Click} style={{ color: "inhereted" }}>
            <PersonIcon style={{ color: "white" }} />
        </Button>
    );
};

export default PersonButton;