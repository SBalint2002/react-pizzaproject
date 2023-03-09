import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useUser } from "../userContext/UserContextProvider";
import {useNavigate} from "react-router-dom";

const ShoppingCartButton = () => {
    const { hasNewOrder } = useUser();
    const navigate = useNavigate();
    const Click= ()=>{
        navigate("/order")
    }

    return (
        <Button onClick={Click} style={{ color: "inhereted" }}>
            <ShoppingCartIcon
                style={{ color: hasNewOrder ? "red" : "white", animation: hasNewOrder ? "pulse 2s infinite" : "none" }}
            />
        </Button>
    );
};

export default ShoppingCartButton;