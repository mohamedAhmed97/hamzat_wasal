import React from "react";
import {
    NavItem,
    NavLink,
} from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const is_auth = cookies.get('UserData');
export const ProtectedRegsiter = () => {
    if (!is_auth) {
        return (
            <NavItem >
                <NavLink href="/register" className="text-light">Register</NavLink>
            </NavItem>
        )
    }
    return (
        null
    )

}