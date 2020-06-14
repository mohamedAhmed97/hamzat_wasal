import React,{ Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import AllCategories from './AllCategories';
import Add from './Add';
import Edit from './Edit';

class Index extends Component {
  
render(){
    return(     
    <div>
        <Router>
            <div className="text-center">
                    <Link to="/categories">
                        <button className="btn btn-primary m-3 p-2"> All Categories</button></Link>
                    <Link to="/categories/add">
                        <button className="btn btn-success p-2">Add Category</button></Link>
                    <Link to="/categories" />
                <Switch>
                        <Route exact path="/categories" component={AllCategories} />  
                        <Route exact path="/categories/add" component={Add} /> 
                        <Route path="/categories/edit/:id" component={Edit} />
                        <Route to="/categories" component={AllCategories} />        
                </Switch>
            </div>
        </Router>   
    </div> 
    )
    }
}

       
export default Index;