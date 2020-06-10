import React from "react";
import {
    NavItem,
    NavLink,
} from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const is_auth = cookies.get('UserData');
export const ProtectedRoute = () => {
    if (is_auth) {
        return (
            <div>

                <NavItem>
                    <NavLink href="/home" className="text-light mr-3">home</NavLink>
                </NavItem>
            </div>
        )
    }
   return(
       null
   )

}