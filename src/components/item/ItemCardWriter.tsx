import ItemCard from "./ItemCard";
import {ProductProps} from "../Contexts/ProductContextProvider";

/**
 *A termékek listáját megjelenítő komponens a szolgáltatott terméklistával
 *@param {ItemCardsWriterProps} props - Az megjelenítendő termékek listáját tartalmazó objektum
 *@returns {JSX.Element} Komponens a termékek kártyáinak listázására
 */
export interface ItemCardsWriterProps { // Termékek listája
    list: ProductProps[];
}

export default function ItemCardsWriter({list}: ItemCardsWriterProps) {
    return (
        <div>
            {list.map((item, i) => (
                <ItemCard
                    id={item.id}
                    key={i}
                    price={item.price}
                    picture={item.picture}
                    name={item.name}
                    description={item.description}
                    available={item.available}
                />
            ))}
        </div>
    );
}