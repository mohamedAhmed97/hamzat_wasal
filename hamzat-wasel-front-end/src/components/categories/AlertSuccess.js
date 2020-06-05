import React,{ Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

class AlertSuccess extends Component {
  
    render(){
        return(
        <div className="alert alert-success border rounded-pill m-3 text-center" role="alert">
            {this.props.message}
            <FontAwesomeIcon className="ml-2 fa-1x" icon={faCalendarCheck} style={{color:"green"}}  /> 
        </div>
        )
    }
}

       
export default AlertSuccess;