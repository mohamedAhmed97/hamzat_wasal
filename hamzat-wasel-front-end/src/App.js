import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Login/Register'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


function App(){
  return (
  <Router>
        <div className="m-3">
          <nav className="navbar navbar-expand-lg navbar-light text-white bg-primary">
            <button className="navbar-toggler" type="button" data-toggle="collapse" 
                    data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-white font-weight-bold">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link text-white font-weight-bold">Register</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/" component={Register} />
        </Switch>
      </Router>
    );
}

export default App;
