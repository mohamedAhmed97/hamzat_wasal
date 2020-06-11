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
import Test from '../home';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {Blogs} from '../Blogs/Blogs';
import {Singleblog} from '../Blogs/Singleblog';
import Test from '../test';
import NotFound from '../templates/404';
import EnhancedTable from '../table/view';
import Posts from '../admin/posts';
import {ProtectedRoute} from '../protected/navitem'
import  {ProtectedLogin} from '../protected/protectedlogin';
import {ProtectedRegsiter} from '../protected/protectedregister';
import {ProtectedLogout} from '../protected/protectedlogout';
import Logout from '../Login/logout';

const Navbar1 = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>

      <Navbar className="mb-3" style={{ backgroundColor: "#24c0d1" }} expand="md">
        <NavbarBrand href="/" className="font-weight-bold text-light">Hamzet Wasl</NavbarBrand>
        <FontAwesomeIcon className="ml-4 d-md-none fa-2x" icon={faBars} style={{ color: "white" }}
           onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto font-weight-bold" navbar>
            <NavItem>
              <NavLink href="/categories" className="text-light">Categories</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/workshops" className="text-light">Workshops</NavLink>
            </NavItem>
            <ProtectedRegsiter></ProtectedRegsiter>
            <ProtectedLogin></ProtectedLogin>
            <ProtectedRoute></ProtectedRoute>
            <ProtectedLogout></ProtectedLogout>
          
          </Nav>
        </Collapse>
      </Navbar>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/categories" component={Categories} />
          <Route path="/Register" component={Register} />
          <Route exact path="/" component={Register} />
          <Route path="/blogs/:id"  component={Singleblog}/>
          <Route path="/blogs" component={Blogs} />
          <Route path="/test" />
          <Route path="/home" component={Test} />
          <Route path="/404" component={NotFound} />
          <Route path="/categories" component={Categories} />
          <Route path="/workshops" component={Workshops} />
          <Route path="/table" component={EnhancedTable} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Register} />
          <Route exact path="/posts/requests" component={Posts} />
        </Switch>
      </Router>
    </div>
  );
}

export default Navbar1;


