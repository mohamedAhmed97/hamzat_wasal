import React from 'react';
import { NavItem, NavLink, Nav } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import {
   faPencilAlt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
const cookies = new Cookies();
class MentorSideBar extends React.Component {
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
                        <NavLink tag={Link} to={"/workshops"} >
                            <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                            Workshops
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
export default MentorSideBar;