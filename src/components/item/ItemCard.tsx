import React from "react";
import "./ItemCard.css";
import Button from "@mui/material/Button";
import {useProduct, ProductProps} from "../Contexts/ProductContextProvider";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({id, picture, name, description, price, available}: ProductProps) => { // Termékkártya
    const {orderList, setOrderList} = useProduct(); // productContextProvider-ből lekérjük a rendelési listát és a beállító függvényt

    const handleBuy: React.MouseEventHandler<HTMLButtonElement> = () => { // Kosárhoz adás függvénye

        if (orderList.some((obj) => obj.id === id)) { // Vizsgálat, ha a termék szerepel már a kosárban figyelmeztetjük a felhasználót
            toast.error('Az elem már megtalálható a kosaradban!')
        } else { // Ha nem szerepel a listában, hozzáadjuk
            setOrderList([
                ...orderList,
                {
                    id,
                    picture,
                    name,
                    description,
                    price,
                    count: 1, // Darabszám beállítása 1-re, kosárban megváltoztatható
                    available,
                },
            ]);

            toast.success('Sikeresen hozzáadva a kosárhoz!');
        }
    };

    return ( /*Kártya megjelenítése*/
        <div className="card">
            <img src={picture} alt={name}/>
            <div>
                <h2>{name}</h2>
                <div className="desc">
                    <p>{description}</p>
                </div>
            </div>
            <div className="card-footer">
                <p style={{fontSize: "16px"}}>Ár: {price} Ft</p>
                <Button style={{color: "green"}} onClick={handleBuy}>
                    Kosárba
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
