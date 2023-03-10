import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import React from "react";

interface NavigationProps {
    closeMenu: () => void;
    LogOut: () => void;
}

interface LinkToProps {
    to: string;
    text: string;
    onClick?: () => void;
    closeMenu: () => void;
}

export default function LinkTo({ to, text, onClick, closeMenu }: LinkToProps) {
    return (
        <Nav.Item style={{margin:'5px'}} onClick={() => {
            if (onClick) {
                onClick();
            }
            closeMenu();
        }}>
            <Link style={{ textDecoration: 'none', color: 'white' }} to={to}>
                {text}
            </Link>
        </Nav.Item>
    );
}