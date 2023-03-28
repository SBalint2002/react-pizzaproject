import { useEffect, useState } from "react";
import ItemCardsWriter from "../../components/item/ItemCardWriter";
import Container from "react-bootstrap/Container";
import { ProductProps } from "../../components/Contexts/ProductContextProvider";
import Footer from "../../components/footer/Footer";
import "./MenuPage.css"

export default function MenuPage() {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/pizza/get-all");
        if (response.ok) {
          const pizzas: ProductProps[] = await response.json();
          setPizzas(pizzas);
        } else {
          console.log("Error fetching products");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="body">
      <Container className="main-content">
        <ItemCardsWriter list={pizzas} />
      </Container>
      <Footer/>
    </div>
  );
}
