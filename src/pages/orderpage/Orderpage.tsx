import React from "react";
import OrderItemWriter from "../../components/orderItem/OrderItemWriter";
import {useProduct} from "../../components/Contexts/ProductContextProvider";
import "./OrderPage.css";
import OrderForm from "../../components/order-dataForms/OrderForm";
import {Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import logo from "../myorderspage/logoszoveg.jpeg";

/**
 *Egy oldalkomponens a rendelés leadásához.
 *@returns {JSX.Element} A JSX elem, amely megjeleníti az oldalt.
 */
export default function Orderpage() {
    const {orderList} = useProduct(); // Kosár tartalmának lekérése a ProductContext-ből

    if (orderList.length === 0) { // Ha a kosárban nem található termék
        /**
         *JSX elem, amely akkor jelenik meg, ha nincsenek elemek a kosárban.
         *@returns {JSX.Element} A JSX elem, amely megjeleníti a üres kosarat.
         */
        return (
            <Container className="emptyContainer">
                <h1>A kosarad még üres...</h1>
                <Link to="/menu" style={{textDecoration: "none"}}><Button>Rendelj most</Button></Link>

                <div>
                    <img style={{width:"300px"}} src={logo} alt="logo"/>
                </div>
            </Container>
        )
    } else {
        /**
         * A kosárban található elemeket megjelenítő JSX elem.
         * @returns {JSX.Element} A kosár elemeket megjelenítő JSX elem.
         */
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