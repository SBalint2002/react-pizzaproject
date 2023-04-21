import React from "react";
import {OrderProduct} from "../Contexts/ProductContextProvider";
import "./OrderItem.css";

// A kosárban található termékek összesített árának kiszámítására szolgáló komponens
type SumProps = {
    orderList: OrderProduct[];  // A kosárban található termékek tömbje
};

const Sum: React.FC<SumProps> = ({orderList}) => {
    const sum = orderList.reduce((total, item) => total + item.price * item.count, 0);
    return <p><b>{sum}Ft</b></p>;
};

export default Sum;