import React from "react";
import {
    NavItem,
    NavLink,
} from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const is_auth = cookies.get('UserData');
export const ProtectedLogin = () => {
    if (!is_auth) {
        return (
            <NavItem>
                <NavLink href="/login" className="text-light mr-3">Login</NavLink>
            </NavItem>
        )
    }
    return (
        null
    )

}