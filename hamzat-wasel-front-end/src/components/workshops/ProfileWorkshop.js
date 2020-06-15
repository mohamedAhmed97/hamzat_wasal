import React,{ Component} from 'react';
import axios from 'axios';
import config from '../token/token';
import AlertSuccess from '../alert/AlertSuccess';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';

class ProfileWorkshops extends Component {
    constructor(props){
        super(props)
        
        const cookies = new Cookies();
        const current_user=cookies.get('UserData'); 
            
        this.state = { 
            workshops: [], 
            alert_message: '',
            search: '',
            current_user_id: current_user.id,
            current_user_isAdmin: current_user.isAdmin

        }
    }

    handleChange = ({target}) =>{
        this.setState({ ...this.state, [target.name]: target.value });
        // console.log(target);   
    };

    handleSearch(event) {
        this.setState({ search: event.target.value.substr(0,20) });
    }
        
    componentDidMount (){ 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get("http://localhost:8000/api/profile/workshops/"+this.props.user.id).then(res => {
                // console.log(res.data);
                this.setState({ workshops: res.data.WorkshopResource})
                    
            }).catch(error => {
                // console.log(error)
            }); 
        });
    };

    onWorkshopDeleted = workshopId => { 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.delete('http://localhost:8000/api/workshops/'+ workshopId,config).then(res => {
                // console.log(res.data);
			    let workshops = this.state.workshops;
                function removeWorkshop(arr, value) {
                    return arr.filter((workshop)=>{
                    return workshop.id !== value; });
                }
            
                this.setState({workshops:removeWorkshop(workshops,workshopId), alert_message: "success"});     
                setTimeout(() => this.setState({alert_message:''}), 9000);

            }).catch(error => {
                this.setState({alert_message: "error"});
                setTimeout(() => this.setState({alert_message:''}), 9000);
                // console.log(error)
            });
        });
    };


render() { 
    let workshops = this.state.workshops.filter((workshop) => {
        return workshop.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });
    
    return ( 
    <div className="container">
        <div className="text-left ml-2">
        <FontAwesomeIcon className="bg-light" icon={faSearch} style={{color:"Blue"}} />  
            <input type="search" className="mb-3 ml-2 p-2" placeholder="Search workshop by name"
                style={{width:198}} onChange={this.handleSearch.bind(this)}/>
             
        </div>
        {this.state.alert_message === "success" ? <AlertSuccess message=
        {"You deleted this workshop successfully, This record isn't a part of the database anymore"} /> : ""}
        <div className="row">
            {workshops.map(workshop => { return (
            <div className="col-md-6 col-xs-12" key={workshop.id}>
                <div className="card border-info mb-3">
                    <div className="bg-transparent border-info">
                        <div className="card-header bg-transparent border-info">          
                            <h5 className="text-info m-3">{workshop.title} 
                                <span className="badge badge-primary float-right"> 
                                    {workshop.category_info.category_name}
                                </span>
                            </h5>  
                        </div>
                        <div className="card-body bg-transparent border-info text-left">  
                            <h5 className="card-text">
                                <span className="badge badge-info p-1 m-1"> 
                                Description:
                                </span> 
                                {workshop.description}
                            </h5> 
                            <h5 className="card-text">
                                <span className="badge badge-info p-1 m-1">
                                Number of attendees: 
                                </span> 
                                {workshop.capcity}
                            </h5> 
                            <h5 className="card-text">
                                <span className="badge badge-info p-1 m-1">
                                Mentor: 
                                </span> 
                                {workshop.mentor_info.name}
                            </h5> 
                            <h5 className="card-text">
                                <span className="badge badge-info p-1 m-1">  
                                price: 
                                </span>
                                {workshop.workshop_price} EGP
                            </h5>
                            <button onClick={()=>{ if 
                            (window.confirm('Are you sure you want to delete this workshop?'))
                            this.onWorkshopDeleted(workshop.id)}} 
                            className="btn btn-danger font-weight-bold m-1"> Delete </button>
                            <Link to={`/workshops/edit/${workshop.id}`}>
                                <button className="btn btn-info font-weight-bold m-1">Edit</button>
                            </Link>

                            {(this.state.current_user_id === workshop.mentor_info.id)?
                            <Link to={`/workshopUser/WorkshopUser/${workshop.id}`}>
                                <button className="btn btn-info font-weight-bold m-1">Manage Users</button>
                            </Link> : "" }

                        
                            {(this.state.current_user_id && this.state.current_user_isAdmin === 0)?
                            
                                <button onClick= {() => {this.onUserJoinedWorkshop(workshop.id)}} className="btn btn-info font-weight-bold m-1">Join Workshop</button>
                                 :""}
                        </div>
                        <div className="card-footer bg-transparent border-info">
                                <small className="text-info m-2">From:  {workshop.start_date}</small>
                                <br />
                                <small className="text-danger m-2">To:  {workshop.end_date}</small>
                        </div>
                    </div>        
                </div>
            </div>
                );
                })
            }    
        </div>        
    </div>  
    );
    }
}

 
export default ProfileWorkshops;