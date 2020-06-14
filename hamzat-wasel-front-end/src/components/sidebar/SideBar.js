import React from "react";

import classNames from "classnames";

import MentorSideBar from './roles/MentorSideBar'
import Cookies from 'universal-cookie';
import SubMenu from "./SubMenu";
import AdminSideBar from './roles/AdminSideBar';
import UserSideBar from "./roles/UserSideBar"
const cookies = new Cookies();
const user = cookies.get('UserData');

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Bootstrap Sidebar</h3>
    </div>
    <div className="side-menu">
      {user.isAdmin==0?
      <UserSideBar></UserSideBar>
      :user.isAdmin==1?
      <MentorSideBar></MentorSideBar>
      :
      <AdminSideBar></AdminSideBar>
      }
    </div>
  </div>
);
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







export default SideBar;