import React from 'react';
import { NavItem, NavLink, Nav } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubMenu from "../SubMenu";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import {
    faPencilAlt,
    faBlog,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
const cookies = new Cookies();
class UserSideBar extends React.Component {
    user = cookies.get('UserData');

    render() {
        if (this.user) {
            return (
                <Nav vertical className="list-unstyled pb-3">
                    <p>{this.user.name}</p>
                    <NavItem >
                        <NavLink tag={Link} to={"/profile"} >
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                     User
                  </NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink tag={Link} to={"/posts"} >
                            <FontAwesomeIcon icon={faBlog} className="mr-2" />
                         Posts
                     </NavLink>
                    </NavItem> 
                    <NavItem >
                        <NavLink tag={Link} to={"/workshops"} >
                            <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                            workshops
                     </NavLink>
                    </NavItem> 

                </Nav>
            );
        }
        else {
            return (null);
        }

    }
}
export default UserSideBar;