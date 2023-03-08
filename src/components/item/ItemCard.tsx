import React from "react";
import './ItemCard.css'
import Button from "@mui/material/Button";

export type ProductProps = {
    id: number;
    picture: string;
    name: string;
    description: string;
    price: number;
};

const ProductCard = ({id, picture, name, description, price }: ProductProps) => {
    const handleBuy = () => {

    };

    return (
        <div className="card">

            <img src={picture} alt={name} />

            <div>
                <h2>{name}</h2>
                <p>{description}</p>
            </div>

            <div className="card-footer">
                <p style={{fontSize: '16px'}}>Ár: {price} Ft</p>
                <Button style={{ color: "green" }} onClick={handleBuy}>
                    Kosárba
                </Button>
            </div>

        </div>
    );
};

export default ProductCard;