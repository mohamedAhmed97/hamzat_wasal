import React,{ Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import AllWorkshops from './AllWorkshops';
import Add from './Add';
import Edit from './Edit';


class Index extends Component {
  
render(){
    return(     
    <React.Fragment>
        <Router>
        <div className="text-center">
                    <Link to="/workshops">
                        <button className="btn btn-primary mr-2 "> All Workshops</button></Link>
                    <Link to="/workshops/add">
                        <button className="btn btn-success">Add Workshop</button></Link>
                    <Link to="/workshops" />
                <Switch>
                        <Route exact path="/workshops" component={AllWorkshops} /> 
                        <Route exact path="/workshops/add" component={Add} /> 
                        <Route path="/workshops/edit/:id" component={Edit} />  
                        <Route to="/workshops" component={AllWorkshops} /> 
                </Switch>
            </div>
        </Router>   
    </React.Fragment>
    )
    }
}

       
export default Index;