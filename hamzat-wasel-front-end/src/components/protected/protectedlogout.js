import React from "react";
import {
    NavItem,
    NavLink,
} from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const is_auth = cookies.get('UserData');


export const ProtectedLogout = () => {
    if (is_auth) {
        return (
            <NavItem>
                <NavLink href="/logout" className="text-light mr-3">logout</NavLink>
            </NavItem>
        )
    }
    return (
        null
    )

}