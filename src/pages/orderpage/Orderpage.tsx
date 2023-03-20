import React, {useState} from "react";
import OrderItemWriter from "../../components/orderItem/OrderItemWriter";
import {Collapse, CollapsePanelProps} from "antd";
import Sum from "../../components/orderItem/SumPrice";
import {useProduct} from "../../components/Contexts/ProductContextProvider";
import {Button} from "@mui/material";

const {Panel} = Collapse;

export default function Orderpage() {
    const {orderList} = useProduct();
    const [activePanel, setActivePanel] = useState("1");

    interface MyCollapsePanelProps extends CollapsePanelProps {
        onClick?: () => void;
    }

    const handleSwitchClick = (key: string) => {
        setActivePanel(key);
    };

    return (
        <>
            <Collapse activeKey={activePanel} accordion onChange={key=>setActivePanel(key as string)}>
                <Panel header="Kosár tartalma" key="1">

                    <OrderItemWriter/>
                    <p>Összesen: </p>
                    <Sum orderList={orderList}/>

                    <Button style={{color: "green"}} onClick={()=>handleSwitchClick("2")}>Tovább</Button>

                </Panel>
                <Panel header="Rendelési adatok" key="2">

                    <p>Rendelési adatok panel</p>

                </Panel>
                <Panel header="Összesítő" key="3">

                    <p>Összesítő panel</p>

                </Panel>
            </Collapse>
        </>
    );
}