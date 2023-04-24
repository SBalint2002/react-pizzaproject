import React from "react";
import {OrderProduct} from "../Contexts/ProductContextProvider";
import "./OrderItem.css";

/**
 *Komponens a kosárban található termékek összesített árának kiszámításához.
 *@function
 *@param {Object} props - A komponenshez átadott props objektum.
 *@param {Array} props.orderList - A kosárban található termékek tömbje.
 *@returns {JSX.Element} A kirajzolt komponens.
 */
type SumProps = {
    orderList: OrderProduct[];  // A kosárban található termékek tömbje
};

const Sum: React.FC<SumProps> = ({orderList}) => {
    const sum = orderList.reduce((total, item) => total + item.price * item.count, 0);
    return <p><b>{sum}Ft</b></p>;
};

export default Sum;