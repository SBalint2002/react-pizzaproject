import React from "react";
import ItemCard, {ProductProps} from "./ItemCard";

interface ItemCardWriterProps{
    list : ProductProps[];
}

export default function ItemCardsWriter({list} : ItemCardWriterProps ){

    return(
      list.map(item=><ItemCard price={item.price} image={item.image} name={item.name} description={item.description}></ItemCard>)
    )

}