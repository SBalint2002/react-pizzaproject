import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useNavigate} from "react-router-dom";
import {Badge} from "@mui/material";
import {useProduct} from "../Contexts/ProductContextProvider";

/**
 * Funkcionális komponens, mely egy bevásárlókosár gombot jelenít meg a fejlécben
 * @function
 * @returns {JSX.Element} - Egy MUI gombot, ami a kosár oldalra navigál az onClick esemény hatására, egy MUI jelölőt, ami a kosárban található termékek számát mutatja, és egy MUI bevásárlókosár ikont, ami a gombban jelenik meg
 */
const ShoppingCartButton = () => {
    /**
     * A termékek összesítő kontextusából kinyerjük a rendelési listát
     * @type {Object}
     * @property {Object[]} orderList - A rendelési lista objektumai
     * @property {string} orderList[].id - A termék egyedi azonosítója
     * @property {string} orderList[].name - A termék neve
     * @property {number} orderList[].price - A termék ára
     * @property {number} orderList[].count - A termék darabszáma a kosárban
     */

    /**
     * A termékek összesítő kontextusából kinyerjük a rendelési listát
     *
     * @return {Object} Rendelési lista
     */
    const { orderList } = useProduct();
    /**
     * Oldalak közti navigáció
     *
     * @type {function}
     */
    const navigate = useNavigate();

    /**
     * Az alábbi függvény hívódik meg, ha a gombra kattintanak, és a '/order' útvonalra navigálja a felhasználót
     * @function
     * @constructor
     */
    const Click = () => {
        navigate("/order");
    };

    /**
     * Az összesítő listából kiszámoljuk a kosárban található termékek számát
     * @type {number}
     */
    const sum = orderList.reduce((total, item) => total + item.count, 0); // Az összesítő listából kiszámoljuk a kosárban található termékek számát

    return (
        <Button onClick={Click} style={{color: "#dc6b29"}}>
            <Badge color="error" badgeContent={sum}>
                <ShoppingCartIcon style={{color: "white"}}/>
            </Badge>
        </Button>
    );
};

export default ShoppingCartButton;
