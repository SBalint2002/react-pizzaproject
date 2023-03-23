import { useProduct} from "../Contexts/ProductContextProvider";
import {SetCountButton} from "./SetCountButton";
import "./OrderItem.css";
import Container from "react-bootstrap/Container";
const OrderItemWriter = () => {
    const {orderList} = useProduct();


    return (
        <Container>
            <table>
                <thead></thead>
                <tbody>
                {orderList.map((item,i)=>
                    <tr className="tr" key={i}>
                        <td><img src={item.picture} alt={item.name}/></td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}Ft</td>
                        <td><SetCountButton id={item.id} value={item.count}/></td>
                    </tr>
                )}
                </tbody>
                <tfoot></tfoot>
            </table>
        </Container>
    );
};

export default OrderItemWriter;