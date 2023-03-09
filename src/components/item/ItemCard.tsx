import React, {useEffect} from "react";
import "./ItemCard.css";
import Button from "@mui/material/Button";
import {useUser, OrderProduct, ProductProps} from "../userContext/UserContextProvider";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({id, picture, name, description, price}: ProductProps) => {
    const {hasNewOrder,setHasNewOrder,orderList, setOrderList} = useUser();

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

        toast.success('Sikeresen hozzáadva a kosárhoz!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        // if (orderList.length>0){
        //     setInterval(()=>{
        //         setHasNewOrder(!hasNewOrder);
        //     },1500)
        // }
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
