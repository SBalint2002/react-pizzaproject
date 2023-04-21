import {useProduct} from "../Contexts/ProductContextProvider";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./OrderItem.css";

// Kosárban lévő elemek darabszámának beállításara szolgáló komponens
export function SetCountButton(props: { value: number, id: number }) {
    const {orderList, setOrderList} = useProduct(); // Kosár tartalmának lekérése a ProductContext-ből
    const index = orderList.findIndex(item => item.id === props.id); // Az elem indexének meghatározása

    // Darabszám növelése
    function Plus() {
        if (index !== -1) {
            const updatedItem = {...orderList[index], count: props.value + 1}; // Az elem frissítése az új darabszámmal
            const updatedList = [...orderList]; // A kosár másolása
            updatedList.splice(index, 1, updatedItem); // Az elem cseréje az új elemre a frissített darabszámmal
            setOrderList(updatedList); // Az új kosár beállítása
        }

    }

    // Darabszám csökkentése
    const Minus = () => {
        if (props.value > 1) {
            if (index !== -1) {
                const updatedItem = {...orderList[index], count: props.value - 1}; // Az elem frissítése a csökkentett darabszámmal
                const updatedList = [...orderList]; // A kosár másolása
                updatedList.splice(index, 1, updatedItem); // Az elem cseréje az új elemre a frissített darabszámmal
                setOrderList(updatedList); // Az új kosár beállítása
            }
        }
    }

    // Elem eltávolítása a kosárból
    const Remove = () => {
        if (index !== -1) {
            const updatedList = [...orderList]; // A kosár másolása
            updatedList.splice(index, 1); // Az elem eltávolítása
            setOrderList(updatedList); // Az új kosár beállítása
        }
    }

    // Darabszám beállításához használt gombok
    return (
        <table>
            <tbody>
            <tr>
                <td>
                    <Button onClick={Minus}><RemoveIcon style={{color: 'black'}}/></Button>
                </td>
                <td>
                    <label><b>{props.value}</b></label>
                </td>
                <td>
                    <Button onClick={Plus}><AddIcon style={{color: 'black'}}/></Button>
                </td>
                <td>
                    <Button onClick={Remove}><DeleteOutlineOutlinedIcon style={{color: 'black'}}/></Button>
                </td>
            </tr>
            </tbody>
        </table>
    );

}