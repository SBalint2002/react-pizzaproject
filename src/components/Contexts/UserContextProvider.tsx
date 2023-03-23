import React, {createContext, PropsWithChildren, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
interface UserContextType{
    logOut: () => void;
    zipCode: string;
    setZipCode: (zip: string)=> void,
    city: string;
    setCity: (city: string)=> void,
    street: string;
    setStreet: (street: string)=> void,
    phoneNumber: string,
    setPhoneNumber:(phone: string)=>void;
}

const defaultContext : UserContextType = {
    logOut: () => {
    },
    zipCode: "",
    setZipCode: () => {
    },
    city: "",
    setCity: () => {
    },
    street: "",
    setStreet: () => {
    },
    phoneNumber: "",
    setPhoneNumber: () => {
    },
}

export const UserContext = createContext<UserContextType>(defaultContext);

export function useUser() {
    return useContext(UserContext);
}

export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const navigate = useNavigate();

    const [zipCode, setZipCode] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [street, setStreet] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const logOut = () => {
        navigate('/');
        localStorage.setItem('Accesstoken', '');
        localStorage.setItem('Refreshtoken', '');
        toast.success("Kijelentkezve!")
    };

    const userContextValue: UserContextType = {
        logOut,
        zipCode,
        setZipCode,
        city,
        setCity,
        street,
        setStreet,
        phoneNumber,
        setPhoneNumber,
    };

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
};

