import React, {useEffect} from "react";
import "./ItemCard.css";
import Button from "@mui/material/Button";
import {useUser, OrderProduct, ProductProps} from "../userContext/UserContextProvider";

const ProductCard = ({id, picture, name, description, price}: ProductProps) => {
    const {orderList, setOrderList} = useUser();

    const handleBuy: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        setOrderList([
            ...orderList,
            {
                id,
                picture,
                name,
                description,
                price,
                count: 1,
            },
        ]);
        console.log(orderList);
    };

    return (
        <div className="card">
            <img src={picture} alt={name}/>
            <div>
                <h2>{name}</h2>
                <p>{description}</p>
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
