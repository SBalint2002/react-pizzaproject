import React from "react";
import {OrderProduct, useUser} from "../userContext/UserContextProvider";
import {SetCountButton} from "./SetCountButton";
import Sum from "./SumPrice";
import "./OrderItem.css";
import Container from "react-bootstrap/Container";

const OrderItemWriter = () => {
    const {orderList} = useUser();

    const handleBuy=()=>{

    }

    return (
        <Container>
        <table>
            {orderList.map((item,i)=>
            <tr className="tr" key={i}>
                <td><img src={item.picture} alt={item.name}/></td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}Ft</td>
                <td><SetCountButton id={item.id} value={item.count}/></td>
            </tr>
            )}
        </table>
            <Sum orderList={orderList}/>
            <button onClick={handleBuy}>Rendelés</button>
        </Container>
    );
};

export default OrderItemWriter;