import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface UserContextType {
    user: string | null;
    logIn: (username: string, password: string) => void;
    logOut: () => void;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    logIn: () => {},
    logOut: () => {},
});

export function useUser() {
    return useContext(UserContext);
}

export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);

    const logIn = (username: string, password: string) => {
        return;
    };

    const logOut = () => {
        setUser(null);
    };

    useEffect(() => {
        fetch('/api/user') //TODO: 'Elérés'
            .then((response) => response.json())
            .then((data) => setUser(data.user))
            .catch((error) => console.error(error));
    }, []);

    return <UserContext.Provider value={{ user, logIn, logOut }}>{children}</UserContext.Provider>;
};