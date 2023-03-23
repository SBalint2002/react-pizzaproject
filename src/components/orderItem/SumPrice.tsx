import React from "react";
import { OrderProduct } from "../Contexts/ProductContextProvider";
import "./OrderItem.css";

type SumProps = {
    orderList: OrderProduct[];
};

const Sum: React.FC<SumProps> = ({ orderList }) => {
    const sum = orderList.reduce((total, item) => total + item.price * item.count, 0);
    return <p> <b>{sum}Ft</b> </p>;
};

export default Sum;