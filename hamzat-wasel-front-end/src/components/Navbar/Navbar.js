import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Login from '../Login/Login'
import Register from '../Login/Register'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar1 = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="mb-3" style={{backgroundColor: "#24c0d1" }} expand="md">
        <NavbarBrand href="/" className="font-weight-bold text-light">Hamzet Wasl</NavbarBrand>
        <FontAwesomeIcon className="ml-4 d-md-none fa-2x" icon={faBars} style={{color:"white"}} onClick={toggle}  />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto font-weight-bold" navbar>
            <NavItem >
              <NavLink href="/register" className="text-light">Register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login" className="text-light mr-3">Login</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default Navbar1;


