import { useUser } from "../Contexts/UserContextProvider";
import Button from "@mui/material/Button";
import { authFetch } from "../../Util";
import { toast } from "react-toastify";
import { useProduct } from "../Contexts/ProductContextProvider";
import {useNavigate} from "react-router-dom";
import SumPrice from "../orderItem/SumPrice";
import "./OrderForm.css";

const OrderForm = () => {
  const { zipCode, city, street, phoneNumber } = useUser();
  const navigate = useNavigate();
  const { orderList } = useProduct();

  const OrderFetch = async () => {
    const pizzaIdsConverter = () => {
      let pizzaIds = [];

      for (let i = 0; i < orderList.length; i++) {
        const { count } = orderList[i];
        if (count != null) {
          for (let j = 0; j < count; j++) {
            pizzaIds.push(orderList[i].id);
          }
        }
      }
      return pizzaIds;
    };

    try {
      const res = await authFetch("/order/add-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: zipCode + "; " + city + "; " + street,
          pizzaIds: pizzaIdsConverter(),
          phoneNumber: phoneNumber,
        }),
      });

      if (res.ok) {
        toast.success("Sikeres rendelés!");
      } else {
        toast.error("Hiba!");
      }
    } catch (error) {
      toast.warning("Rendelés előtt jelentkezz be!!");
      console.log(error);
      navigate('/login');
    }
  };

  return (
    <div className="orderFormBody">
      <h1>Összesítő</h1>
      <div>
        <p>Termékeid:</p> <br/>
        <table className="orderFormTable">
          <tbody>
          {orderList.map(item => (
              <tr className="listItem" key={item.id}>
                <td style={{textAlign:"left", width:"40%"}}>{item.name}</td>
                <td style={{textAlign:"center", width:"20%"}}>{item.count} db</td>
                <td style={{textAlign:"right", width:"40%"}}> {item.price*item.count}Ft</td>
              </tr>
          ))}
          </tbody>
        </table>
        <hr/>
        <p>Összesen: </p> <SumPrice orderList={orderList}/>
      </div>
      <Button onClick={OrderFetch}>Rendelés</Button>
    </div>
  );
};

export default OrderForm;
