import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import {MyOrdersProp} from "../../pages/myorderspage/MyOrdersPage";
import "./MyOrderCard.css";

interface OrderCardProps {
    order: MyOrdersProp;
}

interface PizzaCount {
    name: string;
    count: number;
}

const OrderCard: React.FC<OrderCardProps> = ({order}) => {
    const {location, orderDate, phoneNumber, price, ready, pizzas} = order;
    const [pizzaList, setPizzaList] = useState<PizzaCount[]>([]);

    useEffect(() => {
        const pizzaMap = new Map<string, number>();
        pizzas.forEach((pizza) => {
            const name = pizza.name;
            const count = pizzaMap.get(name) || 0;
            pizzaMap.set(name, count + 1);
        });
        const newPizzaList = Array.from(pizzaMap.entries()).map(([name, count]) => ({
            name,
            count,
        }));
        setPizzaList(newPizzaList);
    }, [pizzas]);

    return (
        <Card className={`${ready ? "orderIsReady" : "orderIsNotReady"}`}>
            <Card.Body>
                <Card.Title>
                    <div>
                        <>{orderDate.toLocaleString()}</>
                        <Card.Subtitle className="mb-2 text-muted">{location}</Card.Subtitle>
                    </div>
                </Card.Title>
                <Card.Text>{phoneNumber}</Card.Text>
                <Card.Text>Ár: {price} Ft</Card.Text>
                <Card.Text>Státusz: {ready ? "Elkészült" : "Készítés alatt"}</Card.Text>
                <Card.Text>Rendelés tartalma:</Card.Text>

                <div className="Pizzak">{pizzaList.map((pizza) => (
                    <p key={pizza.name}>
                        {pizza.name} x{pizza.count}
                    </p>
                ))}</div>
            </Card.Body>
        </Card>
    );
};

export default OrderCard;