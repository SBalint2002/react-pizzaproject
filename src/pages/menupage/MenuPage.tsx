import {useEffect, useState} from "react";
import ItemCardsWriter from "../../components/item/ItemCardWriter";
import Container from "react-bootstrap/Container";
import {ProductProps} from "../../components/Contexts/ProductContextProvider";
import Footer from "../../components/footer/Footer";
import "./MenuPage.css"

/**
 *Egy oldal komponens, ami termékek listáját jeleníti meg.
 *@return {JSX.Element} A JSX elem, ami megjeleníti az oldalt.
 */
export default function MenuPage() {
    const [pizzas, setPizzas] = useState<ProductProps[]>([]); // Lista a termékek tárolásásra

    /**
     * Lekéri a termékeket a szerverről és frissíti a state-et a termékekkel.
     */
    useEffect(() => { // Termékek lekérése
        const fetchData = async () => {
            try {
                const response = await fetch("/pizza/get-all");
                if (response.ok) {
                    const pizzas: ProductProps[] = await response.json();
                    setPizzas(pizzas.filter(x => x.available)); // Termékek kiszűrése elérhetőség alapján
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
                <ItemCardsWriter list={pizzas}/> {/*Termékek mejelenítése*/}
            </Container>
            <Footer/>
        </div>
    );
}
