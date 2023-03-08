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

    const contextValue: UserContextType = {
        user,
        logOut,
        orderList,
        setOrderList,
    };

    return <UserContext.Provider value={contextValue}>
        {children}
    </UserContext.Provider>;
};