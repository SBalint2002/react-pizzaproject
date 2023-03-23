import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

export interface ProductProps {
    id: number;
    picture: string;
    name: string;
    description: string;
    price: number;
    available: boolean;
}

export interface OrderProduct extends ProductProps {
    count: number;
}

interface ProductContextType {
    orderList: OrderProduct[];
    setOrderList: (items: OrderProduct[]) => void;
}

const defaultContext: ProductContextType = {
    orderList: [],
    setOrderList: () => {},
};

export const ProductContext = createContext<ProductContextType>(defaultContext);

export function useProduct() {
    return useContext(ProductContext);
}

export const ProductProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [orderList, setOrderList] = useState<OrderProduct[]>([]);


    const contextValue: ProductContextType = {
        orderList,
        setOrderList,
    };

    return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
};