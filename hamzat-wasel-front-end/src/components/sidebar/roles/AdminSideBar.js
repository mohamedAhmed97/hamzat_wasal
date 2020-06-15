import React from 'react';
import { NavItem, NavLink, Nav } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubMenu from "../SubMenu";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import {
  faBriefcase,
  faPen,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

const cookies = new Cookies();
const user = cookies.get('UserData');
class AdminSideBar extends React.Component {
  user = cookies.get('UserData');

  render() {
    if (this.user) {
      return (
        <Nav vertical className="list-unstyled pb-3">
          
          <SubMenu title="posts" icon={faBriefcase} items={submenus[2]} />
          {/* <SubMenu title="Pages" icon={faCopy} items={submenus[1]} /> */}
          <SubMenu title="categories" icon={faCopy} items={submenus[1]} />

          <NavItem>
            <NavLink tag={Link} to={"/mentors"}>
              <FontAwesomeIcon icon={faPen} className="mr-2" />
            mentors
          </NavLink>
          </NavItem>


          <NavItem>
            <NavLink tag={Link} to={"/workshops"}>
              <FontAwesomeIcon icon={faPen} className="mr-2" />
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
let submenus = [
  [

  ],
  [
    {
      title: "Categories",
      target: "/categories",
    }
  ],
  [

  ]
];
if (user && user.isAdmin == 2) {
  submenus[2].push(
    {
      title: "Approve Post",
      target: "/posts_requests",
    }

  )
}


export default AdminSideBar;