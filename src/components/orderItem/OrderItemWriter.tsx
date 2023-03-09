import React from "react";
import {OrderProduct, useUser} from "../userContext/UserContextProvider";
import {SetCountButton} from "./SetCountButton";
import Sum from "./SumPrice";

const OrderItemWriter = () => {
    const {hasNewOrder,setHasNewOrder,orderList, setOrderList} = useUser();

    const handleBuy=()=>{

    }

    return (
        <div>
        <table>
            {orderList.map((item,i)=>
            <tr key={i}>
                <td>{item.picture}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}Ft</td>
                <td><SetCountButton id={item.id} value={item.count}/></td>
            </tr>
            )}
        </table>
            <Sum orderList={orderList}/>
            <button onClick={handleBuy}>Rendelés</button>
        </div>
    );
};

export default OrderItemWriter;