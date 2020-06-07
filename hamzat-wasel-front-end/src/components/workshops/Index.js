import React,{ Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import AllWorkshops from './AllWorkshops';


class Index extends Component {
  
render(){
    return(     
    <div>
        <Router>
            <div className="text-center">
                    <Link to="/workshops">
                        <button className="btn btn-primary m-3 p-2"> All Workshops</button></Link>
                <Switch>
                        <Route exact path="/workshops" component={AllWorkshops} /> 
                </Switch>
            </div>
        </Router>   
    </div> 
    )
    }
}

       
export default Index;