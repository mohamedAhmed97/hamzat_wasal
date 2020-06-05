import React,{ Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import AllCategories from './AllCategories';

class Index extends Component {
  
render(){
    return(     
    <div>
        <Router>
            <div className="text-center">
                    <Link to="/categories">
                        <button className="btn btn-primary m-3 p-2"> All Categories</button></Link>
                <Switch>
                        <Route exact path="/categories" component={AllCategories} />    
                </Switch>
            </div>
        </Router>   
    </div> 
    )
    }
}

       
export default Index;