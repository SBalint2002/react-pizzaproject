import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ProductProps {
    id: number;
    picture: string;
    name: string;
    description: string;
    price: number;
}

export interface OrderProduct extends ProductProps {
    count: number;
}

interface UserContextType {
    user: string | null;
    logOut: () => void;
    orderList: OrderProduct[];
    setOrderList: (items: OrderProduct[]) => void;
    hasNewOrder: boolean;
    setHasNewOrder: (value: boolean) => void;
}

const defaultContext: UserContextType = {
    user: null,
    logOut: () => {},
    orderList: [],
    setOrderList: () => {},
    hasNewOrder: false,
    setHasNewOrder: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContext);

export function useUser() {
    return useContext(UserContext);
}

export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState<OrderProduct[]>([]);
    const [hasNewOrder, setHasNewOrder] = useState<boolean>(false);

    const logOut = () => {
        setUser(null);
        navigate('/');
        localStorage.setItem('Accesstoken', '');
        localStorage.setItem('Refreshtoken', '');
    };

    const contextValue: UserContextType = {
        user,
        logOut,
        orderList,
        setOrderList,
        hasNewOrder,
        setHasNewOrder,
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};