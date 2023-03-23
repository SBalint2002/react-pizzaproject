import { useUser } from "../Contexts/UserContextProvider";
import Button from "@mui/material/Button";
import { authFetch } from "../../Util";
import { toast } from "react-toastify";
import { useProduct } from "../Contexts/ProductContextProvider";

const OrderForm = () => {
  const { zipCode, city, street, phoneNumber } = useUser();

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
      const res = await authFetch("http://localhost:8080/order/add-order", {
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
      toast.error("Hiba!");
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={OrderFetch}>Rendelés</Button>
    </div>
  );
};

export default OrderForm;
