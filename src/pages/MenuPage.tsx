import React, { useEffect, useState } from "react";
import ItemCardsWriter, { ItemCardsWriterProps } from "../components/item/ItemCardWriter";
import Container from "react-bootstrap/Container";
import { ProductProps } from "../components/item/ItemCard";

export default function MenuPage() {
    const [pizzas, setPizzas] = useState<ProductProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/pizza/get-all");
                if (response.ok) {
                    const pizzas: ProductProps[] = await response.json();
                    setPizzas(pizzas);
                } else {
                    console.log("Error fetching pizzas");
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <ItemCardsWriter list={pizzas} />
        </Container>
    );
}