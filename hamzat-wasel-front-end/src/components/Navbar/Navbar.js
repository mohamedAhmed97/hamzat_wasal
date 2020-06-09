import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Login from '../Login/Login';
import Register from '../Login/Register';
import Categories from '../categories/Index';
import Workshops from '../workshops/Index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Test from '../test';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import NotFound from '../templates/404';
import EnhancedTable from '../table/view';
import Posts from '../admin/posts';

const cookies = new Cookies();

const is_auth = cookies.get('UserData');

const Navbar1 = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar className="mb-3" style={{ backgroundColor: "#24c0d1" }} expand="md">
        <NavbarBrand href="/" className="font-weight-bold text-light">Hamzet Wasl</NavbarBrand>
        <FontAwesomeIcon className="ml-4 d-md-none fa-2x" icon={faBars} style={{ color: "white" }} onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto font-weight-bold" navbar>
            <NavItem>
              <NavLink href="/categories" className="text-light">Categories</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/workshops" className="text-light">Workshops</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="/register" className="text-light">Register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login" className="text-light mr-3">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/home" className="text-light mr-3">home</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/categories" component={Categories} />
          <Route path="/Register" component={Register} />
          <Route path="/home">
            <Test></Test>
          </Route>
          <Route path="/404" component={NotFound} />
          <Route path="/categories" component={Categories} />
          <Route path="/workshops" component={Workshops} />
          <Route path="/table" component={EnhancedTable} />
          <Route path="/" component={Register} />
          <Route exact path="/posts/requests" component={Posts} />
        </Switch>
      </Router>
    </div>
  );
}

export default Navbar1;


