import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import {Blogs} from '../Blogs/Blogs';
import Login from '../Login/Login';
import Topbar from "./Topbar";
import EnhancedTable from '../table/view';
import Posts from '../admin/posts';

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <Route exact path="/" component={() => "Hello"} />
      <Route exact path="/about" component={Login} />
      <Route exact path="/Pages" component={() => "blog"} />
      <Route exact path="/posts/requests" component={Posts} />
      <Route exact path="/faq" component={EnhancedTable} />
      <Route exact path="/contact" component={() => "Contact"} />
      <Route exact path="/Home-1" component={() => "Home-1"} />
      <Route exact path="/Home-2" component={() => "Home-2"} />
      <Route exact path="/Home-3" component={() => "Home-3"} />
      <Route exact path="/Page-1" component={Blogs} />
      <Route exact path="/Page-2" component={() => "Page-2"} />
      <Route exact path="/page-1" component={() => "page-1"} />
      <Route exact path="/page-2" component={() => "page-2"} />
      <Route exact path="/page-3" component={() => "page-3"} />
      <Route exact path="/page-4" component={() => "page-4"} />
    </Switch>
  </Container>
);

export default Content;