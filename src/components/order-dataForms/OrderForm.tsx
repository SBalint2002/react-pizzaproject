import {useUser} from "../Contexts/UserContextProvider";
import {authFetch} from "../../Util";
import {toast} from "react-toastify";
import {useProduct} from "../Contexts/ProductContextProvider";
import {useNavigate} from "react-router-dom";
import SumPrice from "../orderItem/SumPrice";
import "./OrderForm.css";
import DataForm from "./DataForm";
import FlatButton from "@mui/material/Button";
import * as React from "react";

const OrderForm = () => {
    const {zipCode, address, phoneNumber} = useUser(); // Adatok lekérése a UserContext-ből
    const {orderList, setOrderList} = useProduct(); // Kosár tartalmának lekérése a ProductContext-ből
    const navigate = useNavigate(); // Navigációs hook

    // Regex szabályok az dataok ellenőrzésére
    const zipRegex = /^[0-9]{4}$/;
    const addressRegex = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9\s,'-]+$/;
    const phoneRegex = /^\+[0-9]{2}[0-9]{9,10}$/;

    const OrderFetch = async () => { // Rendelés elküldése a backend-nek
        const pizzaIdsConverter = () => { // A rendelt pizzák azonosítóinak konvertálása tömbbé
            let pizzaIds = [];

            for (let i = 0; i < orderList.length; i++) {
                const {count} = orderList[i];
                if (count != null) {
                    for (let j = 0; j < count; j++) {
                        pizzaIds.push(orderList[i].id);
                    }
                }
            }
            return pizzaIds;
        };

        // Validáció a felhasználói adatokkal
        if (!zipRegex.test(zipCode)) {
            toast.error("Hibás irányítószám");
        } else if (!addressRegex.test(address)) {
            toast.error("Hibás rendelési cím");
        } else if (!phoneRegex.test(phoneNumber)) {
            toast.error("Hibás telefonszám");
        } else if (!zipCode || !address || !phoneNumber) {
            toast.error("Minden mező kitöltése kötelező");
        } else {

            try { // Az adatok elküldése a szervernek
                const res = await authFetch("/order/add-order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        location: zipCode + "; " + address,
                        pizzaIds: pizzaIdsConverter(),
                        phoneNumber: phoneNumber,
                    }),
                });

                if (res.ok) { // Ha sikeres volt a rendelés, üzenet kiírása és a rendelt elemek törlése a kosárból, átirányítás a rendeléseim oldalra
                    toast.success("Sikeres rendelés!");
                    setOrderList([]);
                    navigate('/myorders');
                } else {
                    toast.error("Hiba!");
                }
            } catch (error) {  // Ha nem volt bejelentkezve a felhasználó, figyelmeztetés és átirányítás a bejelentkezési oldalra
                toast.warning("Rendelés előtt jelentkezz be!");
                navigate('/login');
            }

        }

    };

    return (
        <div className="orderFormBody">
            <div>
                <DataForm/>
            </div>
            <h2>Összesítő</h2>
            <div>
                <table className="orderFormTable">
                    <tbody>
                    {orderList.map(item => (
                        <tr className="listItem" key={item.id}>
                            <td style={{textAlign: "left", width: "40%"}}>{item.name}</td>
                            <td style={{textAlign: "center", width: "20%"}}>{item.count} db</td>
                            <td style={{textAlign: "right", width: "40%"}}> {item.price * item.count}Ft</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <hr/>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>Összesen:<SumPrice
                    orderList={orderList}/></div>
            </div>
            <FlatButton
                onClick={OrderFetch}
                variant="contained"
                sx={{mb: 2}}
                style={{color: "white", backgroundColor: "#dc6b29", width: "55%"}}
            >
                Rendelés
            </FlatButton>
        </div>
    );
};

export default OrderForm;
