import React from 'react';
import { NavItem, NavLink, Nav } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubMenu from "../SubMenu";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const cookies = new Cookies();
const user = cookies.get('UserData');
class AdminSideBar extends React.Component {
  user = cookies.get('UserData');

  render() {
    if (this.user) {
      return (
        <Nav vertical className="list-unstyled pb-3">
          <p>Dummy Heading</p>
          <SubMenu title="posts" icon={faBriefcase} items={submenus[2]} />
          {/* <SubMenu title="Pages" icon={faCopy} items={submenus[1]} /> */}
          <SubMenu title="categories" icon={faCopy} items={submenus[1]} />

          <NavItem>
            <NavLink tag={Link} to={"/pages"}>
              <FontAwesomeIcon icon={faImage} className="mr-2" />
            Portfolio
          </NavLink>

          </NavItem>


          <NavItem>
            <NavLink tag={Link} to={"/workshops"}>
              <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            FAQ
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/contact"}>
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Contact
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
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
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
submenus[1].push(
  {
    title: "Categories",
    target: "/categories",
  }

)
}
export default AdminSideBar;