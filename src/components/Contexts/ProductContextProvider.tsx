import React, {createContext, PropsWithChildren, useContext, useState} from 'react';


/**
 * Tulajdonságok típusa egy termékhez
 *
 * @typedef {Object} ProductProps
 * @property {number} id - A termék azonosítója
 * @property {string} picture - A termék képének elérési útvonala
 * @property {string} name - A termék neve
 * @property {string} description - A termék leírása
 * @property {number} price - A termék ára
 * @property {boolean} available - A termék elérhetősége
 */
export interface ProductProps {
    id: number;
    picture: string;
    name: string;
    description: string;
    price: number;
    available: boolean;
}

/**
 * Kosárban szereplő termékek típusa
 *
 * @typedef {Object} OrderProduct
 * @property {number} id - A termék azonosítója
 * @property {string} picture - A termék képének elérési útvonala
 * @property {string} name - A termék neve
 * @property {string} description - A termék leírása
 * @property {number} price - A termék ára
 * @property {boolean} available - A termék elérhetősége
 * @property {number} count - A termékből rendelt darabszám
 */
export interface OrderProduct extends ProductProps {
    count: number;
}

/**
 * A ProductContext típusa
 *
 * @typedef {Object} ProductContextType
 * @property {OrderProduct[]} orderList - A kosárban lévő termékek listája
 * @property {Function} setOrderList - A kosár tartalmának frissítése
 */
interface ProductContextType {
    orderList: OrderProduct[];
    setOrderList: (items: OrderProduct[]) => void;
}

/**
 * Alapértelmezett ProductContext értékei
 *
 * @type {ProductContextType}
 */
const defaultContext: ProductContextType = {
    orderList: [],
    setOrderList: () => {
    },
};

/**
 * ProductContext létrehozása
 *
 * @type {React.Context<ProductContextType>}
 */
export const ProductContext = createContext<ProductContextType>(defaultContext);

/**
 * Hook a ProductContext használatához
 *
 * @returns {ProductContextType}
 */
export function useProduct() {
    return useContext(ProductContext);
}

/**
 * A termékek összesítő kontextusa
 *
 * @param {PropsWithChildren} props - A gyerek komponensek
 * @returns {JSX.Element} - Az összesítő kontextus
 */
export const ProductProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
    const [orderList, setOrderList] = useState<OrderProduct[]>([]);

    /**
     * A kontextus értékei
     *
     * @type {ProductContextType}
     */
    const contextValue: ProductContextType = {
        orderList,
        setOrderList,
    };

    return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
};