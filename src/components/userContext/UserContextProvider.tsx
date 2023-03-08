import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductProps } from '../item/ItemCard';

interface OrderProduct extends ProductProps{
    count: number;
}

interface UserContextType {
    user: string | null;
    logOut: () => void;
    orderList: OrderProduct[];
    setOrderList: (items: OrderProduct[]) => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    logOut: () => {},
    orderList: [],
    setOrderList: () => {},
});

export function useUser() {
    return useContext(UserContext);
}

export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState<OrderProduct[]>([]);

    const logOut = () => {
        setUser(null);
        navigate('/');
        localStorage.setItem('Accesstoken', '');
        localStorage.setItem('Refreshtoken', '');
    };

    return (
        <UserContext.Provider value={{ user, logOut, orderList, setOrderList }}>
            {children}
        </UserContext.Provider>
    );
};