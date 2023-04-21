import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

interface UserContextType { // Definiáljuk a UserContextType típust
    logOut: () => void;
    zipCode: string;
    setZipCode: (zip: string) => void,
    address: string;
    setAddress: (city: string) => void,
    phoneNumber: string,
    setPhoneNumber: (phone: string) => void;
}

const defaultContext: UserContextType = { // Definiáljuk az alapértelmezett kontextus értékeket

    logOut: () => {
    },
    zipCode: "",
    setZipCode: () => {
    },
    address: "",
    setAddress: () => {
    },
    phoneNumber: "",
    setPhoneNumber: () => {
    },
}

export const UserContext = createContext<UserContextType>(defaultContext); // Létrehozzuk a UserContext-et

export function useUser() { // Definiáljuk a useUser hook-ot
    return useContext(UserContext);
}

export const UserProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
    const navigate = useNavigate(); // Komponensek közti nevigáció

    const [zipCode, setZipCode] = useState<string>(""); // Rendeléshez szükséges irányítószám
    const [address, setAddress] = useState<string>(""); // Rendeléshez szükséges cím
    const [phoneNumber, setPhoneNumber] = useState<string>(""); // Rendeléshez szükséges telefonszám

    const logOut = () => { // Kijelentkezés függvény
        localStorage.setItem('Accesstoken', ''); // Törli az azonosításhoz szükséges adatokat a LocalStorage-ből
        localStorage.setItem('Refreshtoken', '');
        navigate('/'); // Navigáció a főoldalra kijelentkezés után
        toast.success("Kijelentkezve!") // Visszajelzé a felhasználónak
    };

    const userContextValue: UserContextType = { // Definiáljuk a userContextValue objektumot
        logOut,
        zipCode,
        setZipCode,
        address,
        setAddress,
        phoneNumber,
        setPhoneNumber,
    };

    return ( // Provider komponens visszatérése
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
};

