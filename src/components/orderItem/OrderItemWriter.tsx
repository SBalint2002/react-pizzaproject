import {useProduct} from "../Contexts/ProductContextProvider";
import {SetCountButton} from "./SetCountButton";
import "./OrderItem.css";
import Container from "react-bootstrap/Container";

const OrderItemWriter = () => {
    const {orderList} = useProduct();

    return (
        <Container className="itemcontainer">
            {orderList.map((item ,i)=>
                <div className="itemcard" key={i}>
                    <div className="itemimg"><img className="img" src={item.picture} alt={item.name}/></div>
                    <div className="itemname">{item.name}</div>
                    <div className="itemdesc">{item.description}</div>
                    <div className="itemprice">{item.price}Ft </div>
                    <div className="itembutton"><SetCountButton id={item.id} value={item.count}/></div>
                </div>
            )}
        </Container>
    )
};

export default OrderItemWriter;