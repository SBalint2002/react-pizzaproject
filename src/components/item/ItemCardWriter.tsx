import ItemCard from "./ItemCard";
import { ProductProps } from "../Contexts/ProductContextProvider";

export interface ItemCardsWriterProps {
  list: ProductProps[];
}

export default function ItemCardsWriter({ list }: ItemCardsWriterProps) {
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
