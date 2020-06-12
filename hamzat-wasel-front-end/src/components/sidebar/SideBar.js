import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faPen,
  faImage,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import UserData from '../token/userdata';
import Cookies from 'universal-cookie';
import SubMenu from "./SubMenu";

const cookies = new Cookies();
const user=cookies.get('UserData');
const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Bootstrap Sidebar</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <p>Dummy Heading</p>
        <SubMenu title="Home" icon={faHome} items={submenus[0]} />
        <SubMenu title="posts" icon={faBriefcase} items={submenus[2]} />
        <SubMenu title="categories" icon={faCopy} items={submenus[1]} />
        <NavItem>
          <NavLink tag={Link} to={"/pages"}>
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            Portfolio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/faq"}>
            <FontAwesomeIcon icon={faPen} className="mr-2" />
            Workshops
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/contact"}>
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Contact
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

let submenus = [
  [
    {
      title: "Home 1",
      target: "Home-1",
    },

    {
      title: "Home 2",
      target: "Home-2",
    },
    {
      itle: "Home 3",
      target: "Home-3",
    },
  ],
  [
    
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

  submenus[1].push(
    {
      title: "Categories",
      target: "/categories",
    }

  )
}



export default SideBar;