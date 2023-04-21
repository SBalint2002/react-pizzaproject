import React, {createContext, PropsWithChildren, useContext, useState} from 'react';

export interface ProductProps { // Termék tulajdonságok típusa
    id: number;
    picture: string; // String, mivel egy elérési útvonalat tárol
    name: string;
    description: string;
    price: number;
    available: boolean;
}

export interface OrderProduct extends ProductProps { // Kosárban szereplő termékek darabszáma
    count: number;
}

interface ProductContextType { // ProductContext típusai
    orderList: OrderProduct[]; // Kosárban lévő termékek listája
    setOrderList: (items: OrderProduct[]) => void;
}

const defaultContext: ProductContextType = { // Alapértelmezett ProductContext értékei
    orderList: [],
    setOrderList: () => {
    },
};

export const ProductContext = createContext<ProductContextType>(defaultContext); // ProductContext létrehozása

export function useProduct() {
    return useContext(ProductContext);
}

export const ProductProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
    const [orderList, setOrderList] = useState<OrderProduct[]>([]); // Rendelt termékek állapotának inicializálása


    const contextValue: ProductContextType = { // Context értékeinek definiálása
        orderList,
        setOrderList,
    };

    return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>; // Provider komponens visszatérése
};