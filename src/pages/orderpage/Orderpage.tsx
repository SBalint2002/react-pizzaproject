import React from "react";
import OrderItemWriter from "../../components/orderItem/OrderItemWriter";
import {useProduct} from "../../components/Contexts/ProductContextProvider";
import "./OrderPage.css";
import OrderForm from "../../components/order-dataForms/OrderForm";
import {Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

export default function Orderpage() {
    const {orderList} = useProduct();

    if (orderList.length === 0) {
        return (
            <Container className="emptyContainer">
                <h1>A kosarad még üres...</h1>
                <Link to="/menu" style={{textDecoration: "none"}}><Button>Rendelj most</Button></Link>
            </Container>
        )
    } else {

        return(
            <div className="orderBody">
                <Container className="orderContainer">
                    <Row>
                        <div className="left">
                            <h1 style={{color:"white"}}>Kosár</h1>
                            <OrderItemWriter/>
                        </div>

                        <div className="right">
                            <div><OrderForm/></div>
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
} 