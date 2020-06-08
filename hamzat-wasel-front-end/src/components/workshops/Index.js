import React,{ Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import AllWorkshops from './AllWorkshops';
import Add from './Add';


class Index extends Component {
  
render(){
    return(     
    <div>
        <Router>
            <div className="text-center">
                    <Link to="/workshops">
                        <button className="btn btn-primary m-3 p-2"> All Workshops</button></Link>
                    <Link to="/workshops/add">
                        <button className="btn btn-success p-2">Add Workshop</button></Link>
                <Switch>
                        <Route exact path="/workshops" component={AllWorkshops} /> 
                        <Route exact path="/workshops/add" component={Add} /> 
                </Switch>
            </div>
        </Router>   
    </div> 
    )
    }
}

       
export default Index;