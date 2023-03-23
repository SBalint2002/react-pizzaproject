import React, {useEffect} from "react";
import "./ItemCard.css";
import Button from "@mui/material/Button";
import {useProduct, ProductProps} from "../Contexts/ProductContextProvider";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({id, picture, name, description, price, available}: ProductProps) => {
    const {orderList, setOrderList} = useProduct();

    const handleBuy: React.MouseEventHandler<HTMLButtonElement> = (event) => {

        if (orderList.some((obj)=>obj.id===id)){
            toast.error('Az elem már megtalálható a kosaradban!')
        }else{
            setOrderList([
                ...orderList,
                {
                    id,
                    picture,
                    name,
                    description,
                    price,
                    count: 1,
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
