import React,{ Component} from 'react';
import axios from 'axios';
import config from '../token/token';
import AlertSuccess from '../alert/AlertSuccess';
import { Link } from 'react-router-dom';
import Pagination from '../categories/Pagination';
import Cookies from 'universal-cookie';

class AllWorkshops extends Component {
    constructor(props){
        super(props)
            
        const cookies = new Cookies();
        const current_user=cookies.get('UserData'); 
        // console.log(current_user);
        this.state = { 
            workshops: [], 
            alert_message: '',
            alert_message2: '',
            // search: '',
            total: '',
            current_page: 1,
            per_page: '',
            last_page: '',
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
            axios.get('http://localhost:8000/api/workshops?page='+this.state.current_page,config).then(res => {
                // console.log(res.data.data);
                this.setState({ 
                    workshops: res.data.data,
                    total: res.data.meta.total,
                    current_page: res.data.meta.current_page,
                    per_page: res.data.meta.per_page,
                    last_page: res.data.meta.last_page
                }) 
                    
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

    onUserJoinedWorkshop = (workshopId) =>{
        var formData = new FormData(); 
        formData.append("user_id" , this.state.current_user_id);
        formData.append("workshop_id" , workshopId);
        axios.post('http://localhost:8000/api/workshopUser',formData,config).then(res => {
            this.setState({ alert_message2: "success"});     
                setTimeout(() => this.setState({alert_message2:''}), 8000);
                // console.log(res.data);    
                }).catch(error => {
                    // console.log(error)
                }); 
    }


render() {
    const {  per_page, last_page , current_user , cookies } = this.state;
    // console.log(this.state.current_user_isAdmin); 
    
    const indexOfLastWorkshop = last_page;
    const indexOfFirstWorkshop = indexOfLastWorkshop - per_page;
    this.state.workshops.slice(indexOfFirstWorkshop, indexOfLastWorkshop);

    const paginate = pageNum => {
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/workshops?page='+(this.state.current_page=pageNum),config).then(res => {
                // console.log(res.data);
                this.setState({ 
                    workshops: res.data.data,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                    current_page: pageNum,
                })
                    
            }).catch(error => {
                // console.log(error.response)
            }); 
        });
    };

    const nextPage = () => { 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/workshops?page='+(this.state.current_page+1),config).then(res => {
                // console.log(res.data);
                if(!res.data.meta.last_page < this.state.current_page + 1){
                this.setState({ 
                    workshops: res.data.data,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                    current_page: this.state.current_page + 1,
                })
            }
                    
            }).catch(error => {
                // console.log(error)
            }); 
        });
    }
        
    const prevPage = () => {
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/workshops?page='+(this.state.current_page-1),config).then(res => {
                // console.log(res.data);
                this.setState({ 
                    workshops: res.data.data,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                    current_page: this.state.current_page - 1 
                })
                    
            }).catch(error => {
                // console.log(error.response)
            }); 
        });
    }

    // let workshops = this.state.workshops.filter((workshop) => {
    //     return workshop.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    // });
    
    return ( 
    <div className="container">
        {/* <div className="text-right ml-2">
        <FontAwesomeIcon className="bg-light" icon={faSearch} style={{color:"Blue"}} />  
            <input type="search" className="m-3" placeholder="Search workshop by name"
                style={{width:198}} onChange={this.handleSearch.bind(this)}/>
             
        </div> */}
        {this.state.alert_message2 === "success" ? <AlertSuccess message=
        {"Your request has been sent, please check your email"} /> : ""}
        {this.state.alert_message === "success" ? <AlertSuccess message=
        {"You deleted this workshop successfully, This record isn't a part of the database anymore"} /> : ""}
        <div className="row mt-3">
            {this.state.workshops.map(workshop => { return (
            <div className="col-md-6 col-xs-4" key={workshop.id}>
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
                                <span className="badge badge-info mr-1"> 
                                Description
                                </span> 
                                {workshop.description}
                            </h5> 
                            <h5 className="card-text">
                                <span className="badge badge-info mr-1">
                                Number of attendees 
                                </span> 
                                {workshop.capcity}
                            </h5> 
                            <h5 className="card-text">
                                <span className="badge badge-info mr-1">
                                Mentor 
                                </span> 
                                {workshop.mentor_info.name}
                            </h5> 
                            <h5 className="card-text">
                                <span className="badge badge-info mr-1">  
                                price 
                                </span>
                               <del> {workshop.workshop_price} EGP </del>
                               <span className="ml-2 text-danger"> Free</span>
                            </h5>
                            {(this.state.current_user_id === workshop.mentor_info.id)?
                            <button onClick={()=>{ if 
                            (window.confirm('Are you sure you want to delete this workshop?'))
                            this.onWorkshopDeleted(workshop.id)}} 
                            className="btn btn-danger font-weight-bold m-1"> Delete </button> : "" }
                            {(this.state.current_user_id === workshop.mentor_info.id)?
                            <Link to={`/workshops/edit/${workshop.id}`}>
                                <button className="btn btn-info font-weight-bold m-1">Edit</button>
                            </Link> : "" }
                           
                           
                            {(this.state.current_user_id === workshop.mentor_info.id)?
                            <Link to={`/workshopUser/WorkshopUser/${workshop.id}`}>
                                <button className="btn btn-info font-weight-bold m-1">Manage Users</button>
                            </Link> : "" }

                        
                            {(this.state.current_user_id && this.state.current_user_isAdmin == 0)?
                            
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
        <div className="mt-3">
        <Pagination per_page={per_page} total={this.state.total} paginate={paginate} 
            nextPage={nextPage} prevPage={prevPage} />        
    </div>
    </div>  
    );
    }
}

 
export default AllWorkshops;