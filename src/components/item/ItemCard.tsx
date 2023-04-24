import React from "react";
import "./ItemCard.css";
import Button from "@mui/material/Button";
import {useProduct, ProductProps} from "../Contexts/ProductContextProvider";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Megjeleníti a termékinformációkat és egy gombot a termék hozzáadásához a kosárhoz
 * @param {ProductProps} props - A termékinformációkat tartalmazó objektum
 * @returns {JSX.Element} A termékkártya komponens
 */
const ProductCard = ({id, picture, name, description, price, available}: ProductProps) => {
    const {orderList, setOrderList} = useProduct();

    /**
     * A termék hozzáadása a kosárhoz, ha még nincs a kosárban
     * @param {React.MouseEvent<HTMLButtonElement>} event - Kattintás esemény
     */
    const handleBuy: React.MouseEventHandler<HTMLButtonElement> = () => {

        if (orderList.some((obj) => obj.id === id)) {
            toast.error('Az elem már megtalálható a kosaradban!')
        } else {
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

    return (
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
