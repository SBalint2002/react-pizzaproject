import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { useProduct } from "../Contexts/ProductContextProvider";

const ShoppingCartButton = () => {
  const navigate = useNavigate();
  const { orderList } = useProduct();
  const Click = () => {
    navigate("/order");
  };

  const sum = orderList.reduce((total, item) => total + item.count, 0);

  return (
    <Button onClick={Click} style={{ color: "inhereted" }}>
      <Badge color="error" badgeContent={sum}>
        <ShoppingCartIcon style={{ color: "white" }} />
      </Badge>
    </Button>
  );
};

export default ShoppingCartButton;
