import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useNavigate} from "react-router-dom";
import {Badge} from "@mui/material";
import {useProduct} from "../Contexts/ProductContextProvider";

const ShoppingCartButton = () => { // Funkcionális komponens, mely egy bevásárlókosár gombot jelenít meg a fejlécben
    const navigate = useNavigate(); // A React Router useNavigate hookját használjuk, hogy az útvonalak közötti váltást megvalósítsuk
    const {orderList} = useProduct(); // A termékek összesítő kontextusából kinyerjük a rendelési listát

    const Click = () => {   // Az alábbi függvény hívódik meg, ha a gombra kattintanak, és a '/order' útvonalra navigálja a felhasználót
        navigate("/order");
    };

    const sum = orderList.reduce((total, item) => total + item.count, 0); // Az összesítő listából kiszámoljuk a kosárban található termékek számát

    // A következőt adja vissza:
    // egy MUI gombot, ami a kosár oldalra navigál az onClick esemény hatására,
    // egy MUI jelölőt, ami a kosárban található termékek számát mutatja,
    // és egy MUI bevásárlókosár ikont, ami a gombban jelenik meg

    return (
        <Button onClick={Click} style={{color: "#dc6b29"}}>
            <Badge color="error" badgeContent={sum}>
                <ShoppingCartIcon style={{color: "white"}}/>
            </Badge>
        </Button>
    );
};

export default ShoppingCartButton;
