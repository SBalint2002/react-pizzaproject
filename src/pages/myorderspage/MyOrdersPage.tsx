import React, {useEffect, useState} from "react";
import "./MyOrders.css";
import Container from "react-bootstrap/Container";
import {authFetch} from "../../Util";
import {OrderProduct} from "../../components/Contexts/ProductContextProvider";
import MyOrderCard from "../../components/myordercard/MyOrderCard";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import logo from "./logoszoveg.jpeg";

export interface MyOrdersProp { // Megjelenítendő adatok
    location: string;
    orderDate: Date;
    phoneNumber: string;
    price: number;
    ready: boolean;
    pizzas: OrderProduct[];

}

/**
 *Az oldal komponense, amely megjeleníti a felhasználó korábbi rendeléseit.
 *@returns {JSX.Element} A JSX elem, amely az oldalt jeleníti meg.
 */
const MyOrdersPage = () => {
    const [myOrdersList, setMyOrdersList] = useState<MyOrdersProp[]>([]); // Rendelések tárolására szolgáló lista

    /**
     *Lekéri a felhasználó rendeléseit a szerverről és frissíti velük a state-et.
     */
    const fetchData= async ()=>{ // A felhasználóhoz tartozó rendelések lekérése
        try {
            const res = await authFetch("/order/get-orders",{
                method: "GET",
            });

            if (res.ok){
                const json = await res.json();
                const orders = json.map((order: any) => { // Szükséges adatok kiválogatása a válaszból
                    return {
                        location: order.location,
                        orderDate: new Date(order.order_date),
                        phoneNumber: order.phone_number,
                        price: order.price,
                        ready: order.ready,
                        pizzas: order.orderPizzas.map((pizza: any) => {
                            return {
                                id: pizza.id,
                                name: pizza.pizza.name,
                                description: pizza.pizza.description,
                                picture: pizza.pizza.picture,
                                price: pizza.pizza.price,
                                available: pizza.pizza.available
                            }
                        })
                    }
                });
                setMyOrdersList(orders.reverse()); // Lista megfordítása
            } else {
                console.log("Invalid token");
            }
        } catch (error) {
            console.log("Sikertelen lekérés");
            console.log(error);
        }
    }

    useEffect( ()  =>  {
        fetchData();
        setInterval(()=>{
            fetchData(); // Adatok lekérése percenként, státusz változás miatt
        },6000)
    }, []);

    if (myOrdersList.length===0){ // Ha a felhasználó nem rendelkezik még rendeléssel
        return (
            <Container className="emptyContainer">
                <h1>Még nem adtál le rendelést...</h1>
                <Link to="/menu" style={{textDecoration: "none"}}><Button>Rendelj most</Button></Link>

                <div>
                    <img style={{width:"300px"}} src={logo} alt="logo"/>
                </div>

            </Container>
        )
    }else{
        return ( // A felhasználóhoz tartozó rendelések kiiratása
            <Container>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {myOrdersList.map((order, i) => (
                        <MyOrderCard key={i} order={order} />
                    ))}
                </div>
            </Container>
        );
    }

}

export default MyOrdersPage;