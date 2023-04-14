import React, {useEffect, useState} from "react";
import "./MyOrders.css";
import Container from "react-bootstrap/Container";
import {authFetch} from "../../Util";
import {OrderProduct} from "../../components/Contexts/ProductContextProvider";
import MyOrderCard from "../../components/myordercard/MyOrderCard";

export interface MyOrdersProp {
    location: string;
    orderDate: Date;
    phoneNumber: string;
    price: number;
    ready: boolean;
    pizzas: OrderProduct[];

}

const MyOrdersPage = () => {
    const [myOrdersList, setMyOrdersList] = useState<MyOrdersProp[]>([]);
    const fetchData= async ()=>{
        try {
            const res = await authFetch("/order/get-orders",{
                method: "GET",
            });

            if (res.ok){
                const json = await res.json();
                const orders = json.map((order: any) => {
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
                setMyOrdersList(orders);
            } else {
                console.log("Invalid token");
            }
        } catch (error) {
            console.log("Sikertelen lekérés");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            <Container>
                {myOrdersList.map((order, i) => (
                    <MyOrderCard key={i} order={order} />
                ))}
            </Container>
        </div>
    )
}

export default MyOrdersPage;