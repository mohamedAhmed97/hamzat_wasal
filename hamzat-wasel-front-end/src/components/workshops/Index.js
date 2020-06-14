import React,{ Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import AllWorkshops from './AllWorkshops';
import Add from './Add';
import Edit from './Edit';
import WorkshopUser from '../workshopUser/WorkshopUser';


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
                        <Route path="/workshops/edit/:id" component={Edit} />
                        <Route path="/workshopUser/workshopUser/:id" component={WorkshopUser}/> 
                </Switch>
            </div>
        </Router>   
    </div> 
    )
    }
}

       
export default Index;