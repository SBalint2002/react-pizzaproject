import React, {useState} from "react";
import OrderItemWriter from "../../components/orderItem/OrderItemWriter";
import {Collapse} from "antd";
import Sum from "../../components/orderItem/SumPrice";
import {useProduct} from "../../components/Contexts/ProductContextProvider";
import DataForm from "../../components/order-dataForms/DataForm";
import "./OrderPage.css";
import OrderForm from "../../components/order-dataForms/OrderForm";
import Footer from "../../components/footer/Footer";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const {Panel} = Collapse;

export default function Orderpage() {
    const {orderList} = useProduct();
    const [activePanel, setActivePanel] = useState("1");

    const handleSwitchClick = (key: string) => {
        setActivePanel(key);
    };

    if (orderList.length==0){
        return (
            <Container className="emptyContainer">
                <h1>A kosarad még üres...</h1>
                <Link to="/menu" style={{textDecoration: "none"}}><Button>Rendelj most</Button></Link>
            </Container>
        )
    }else {

        return (
            <>
                <Container className="main-content">
                    <Collapse
                        activeKey={activePanel}
                        accordion
                        onChange={(key) => setActivePanel(key as string)}
                    >
                        <Panel header="Kosár tartalma" key="1">
                            <OrderItemWriter/>
                            <p>Összesen: </p>
                            <Sum orderList={orderList}/>

                            <Button
                                style={{color: "green"}}
                                onClick={() => handleSwitchClick("2")}
                            >
                                Tovább
                            </Button>
                        </Panel>
                        <Panel header="Rendelési adatok" key="2">
                            <DataForm/>

                            <Button
                                style={{color: "green"}}
                                onClick={() => handleSwitchClick("3")}
                            >
                                Tovább
                            </Button>
                        </Panel>
                        <Panel header="Összesítő" key="3">
                            <OrderForm/>
                        </Panel>
                    </Collapse>
                </Container>
                <Footer/>
            </>
        );
    }
}
