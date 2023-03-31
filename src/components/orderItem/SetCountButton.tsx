import {useProduct} from "../Contexts/ProductContextProvider";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./OrderItem.css";

export function SetCountButton(props: { value: number, id: number }) {
    const {orderList, setOrderList} = useProduct();
    const index = orderList.findIndex(item => item.id === props.id);

    function Plus() {
        if (index !== -1) {
            const updatedItem = {...orderList[index], count: props.value + 1};
            const updatedList = [...orderList];
            updatedList.splice(index, 1, updatedItem);
            setOrderList(updatedList);
        }

    }

    const Minus = () => {
        if (props.value > 1) {
            if (index !== -1) {
                const updatedItem = {...orderList[index], count: props.value - 1};
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
            <tbody>
            <tr>
                <td>
                    <Button onClick={Minus}><RemoveIcon/></Button>
                </td>
                <td>
                    <label>{props.value}</label>
                </td>
                <td>
                    <Button onClick={Plus}><AddIcon/></Button>
                </td>
                <td>
                    <Button onClick={Remove}><DeleteOutlineOutlinedIcon/></Button>
                </td>
            </tr>
            </tbody>
        </table>
    );

}