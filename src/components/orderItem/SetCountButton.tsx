import React from "react";
import {useUser} from "../userContext/UserContextProvider";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from "@mui/material/Button";

export function SetCountButton(props: { value: number, id: number }) {
    const {orderList, setOrderList} = useUser();
    const index = orderList.findIndex(item => item.id === props.id);

    function Plus() {
        if (index !== -1) {
            const updatedItem = { ...orderList[index], count: props.value + 1 };
            const updatedList = [...orderList];
            updatedList.splice(index, 1, updatedItem);
            setOrderList(updatedList);
        }

    }

    const Minus = () => {
        if (props.value > 1) {
            if (index !== -1) {
                const updatedItem = { ...orderList[index], count: props.value - 1 };
                const updatedList = [...orderList];
                updatedList.splice(index, 1, updatedItem);
                setOrderList(updatedList);
            }
        }
    }

    const Remove = () => {
            if (index !== -1) {
                const updatedList = [...orderList];
                updatedList.splice(index, 1);
                setOrderList(updatedList);
            }
    }



    return (
        <table>
            <tr>
                <td>
                    <Button onClick={Minus}>-</Button>
                </td>
                <td><label>{props.value }</label></td>
                <td>
                    <Button onClick={Plus}>+</Button>
                </td>
                <td>
                    <Button onClick={Remove}><DeleteOutlineOutlinedIcon/></Button>
                </td>
            </tr>
        </table>
    );

}