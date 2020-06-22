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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Blogs } from '../Blogs/Blogs';
import { Singleblog } from '../Blogs/Singleblog';
import { Addblog } from '../Blogs/Addblog';
import Cookies from 'universal-cookie';
import Home from '../home';
import NotFound from '../templates/404';
import Posts from '../admin/posts';
import { ProtectedRoute } from '../protected/navitem'
import { ProtectedLogin } from '../protected/protectedlogin';
import { ProtectedRegsiter } from '../protected/protectedregister';
import { ProtectedLogout } from '../protected/protectedlogout';
import Logout from '../Login/logout';

const cookies = new Cookies();
const user = cookies.get('UserData');
console.log(user);

const Navbar1 = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const cookies = new Cookies();
  const user = cookies.get('UserData');
  return (
    <div>

      <Navbar className="mb-3" style={{ backgroundColor: "#24c0d1" }} expand="md">
      <img src={process.env.PUBLIC_URL +"/images/logo.png"} 
        style={{width:50, height:50}} className= "p-1 img-thumbnail" alt="logo" /> 
        <NavbarBrand href="/" className="font-weight-bold ml-2 text-light">
          Hamzet Wasl</NavbarBrand>
        <FontAwesomeIcon className="ml-4 d-md-none fa-2x" icon={faBars} style={{ color: "white" }}
          onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto font-weight-bold" navbar>
            { !user ? 
            <NavItem>
              <NavLink href="/Blogs" className="text-light">Blogs</NavLink>
            </NavItem> :""}
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
          <Route path="/Register" component={Register} />
          <Route exact path="/blogs/addblog" component={Addblog} />
          <Route path="/blogs/:id" component={Singleblog} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/test" />
          <Route path="/home" component={Home} />
          <Route path="/404" component={NotFound} />
          <Route path="/posts/requests" component={Posts} />
          <Route path="/logout" component={Logout} />
          
          {user!=null?
           
            <Route path="/" component={Home} />
            :
            <Route path="/" component={Login} />
          }


        </Switch>
      </Router>
    </div>
  );
}

export default Navbar1;


