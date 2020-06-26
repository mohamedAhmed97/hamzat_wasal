import React,{ Component} from 'react';
import axios from 'axios';
import config from '../token/token';
import Cookies from 'universal-cookie';
import AlertSuccess from '../alert/AlertSuccess';
import './form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


class Add extends Component {
    constructor(props){
        super(props)

        const cookies = new Cookies();
        const current_user = cookies.get('UserData');
        // console.log(current_user.id);
        
        this.state = {
            title: '',
            description: '',
            start_date: '',
            end_date: '',
            capcity: '',
            workshop_price: '',
            user_id: current_user.id,
            category_id: '',
            meeting_link:'',
            meeting_password: '',
            meeting_backup_link: '',
            meeting_backup_password: '',
            categories:[],
            alert_message: '',
            titleError: '',
            descriptionError: '',
            start_dateError: '',
            end_dateError: '',
            capcityError: '',
            workshop_priceError: '',
            category_idError: '',
            meeting_linkError:'',
            meeting_passwordError: '',
            meeting_backup_linkError: '',
            meeting_backup_passwordError: '',
        }
    }

    componentDidMount (){ 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/categories',config).then(res => {
                // console.log(res.data.data);
                this.setState({ 
                    categories: res.data.data,
                    category_id:res.data.data[0].category_id
                })
                    
            }).catch(error => {
                // console.log(error)
            }); 
        });
    };

    handleChange = ({target}) =>{
        this.setState({ ...this.state, [target.name]: target.value });
        // console.log(target.name);
        // console.log(target.value);
        // console.log(this.state);   
    };

    showAlert(ev) {
        alert("You have to choose the platform you prefer to hold the meeting using it example: Zoom, Google Hangouts,.. etc and the meeting URL and password will be sent to the accepted users ONLY")
        ev.preventDefault(); 
    }
    
    onWorkshopAdded = e => {
        e.preventDefault();
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.post('http://localhost:8000/api/workshops',this.state,config).then(res => {
                // console.log(res.data);
                
                this.setState({
                    alert_message: "success",
                    titleError: '',
                    descriptionError: '',
                    start_dateError: '',
                    end_dateError: '',
                    capcityError: '',
                    workshop_priceError: '',
                    category_idError: '',
                    meeting_linkError:'',
                    meeting_passwordError: '',
                    meeting_backup_linkError: '',
                    meeting_backup_passwordError: '',
                });
                setTimeout(() => this.setState({alert_message:''}), 2000);
                
            }).catch(error => { 
                this.setState({
                    alert_message: "error",
                    titleError: error.response.data.errors.title,
                    descriptionError: error.response.data.errors.description,
                    start_dateError: error.response.data.errors.start_date,
                    end_dateError: error.response.data.errors.end_date,
                    capcityError: error.response.data.errors.capcity,
                    workshop_priceError: error.response.data.errors.workshop_price,
                    category_idError: error.response.data.errors.category_id,
                    meeting_linkError: error.response.data.errors.meeting_link,
                    meeting_passwordError: error.response.data.errors.meeting_password,
                    meeting_backup_linkError: error.response.data.errors.meeting_backup_link,
                    meeting_backup_passwordError: error.response.data.errors.meeting_backup_password,
                });
                setTimeout(() => this.setState({alert_message:''}), 2000);
                // console.log(error.response.data.errors)   
            });
        });
}


render() {
    // console.log(this.state);  
    return (     
    <div className="container mt-3">
        {this.state.alert_message === "success" ? 
                <AlertSuccess message="Workshop added successfully" /> : ""}
        <div className="row">
            <div className="col-12">
                <form className="form-info p-3 mb-5" onSubmit={this.onSubmit}>
                    <div className="form-row m-1">
                        <label htmlFor="title" className="font-weight-bold mr-2">
                            Name: </label>
                        <input type="text" name="title" className="mr-2 input-description" 
                            value={this.state.title} onChange={this.handleChange}/>
                        <span className="errors">
                            {this.state.titleError}    
                            {this.state.titleError ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>
                    </div> 
                    <div className="form-row m-1">
                        <label htmlFor="workshops" className="font-weight-bold mr-2">
                            Description: </label>
                        <input type="text" name="description" className="mr-2 input-description" 
                            value={this.state.description} onChange={this.handleChange}/>
                        <span className="errors">
                            {this.state.descriptionError}    
                            {this.state.descriptionError ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>
                    </div> 
                    <div className="form-row m-1">
                        <label htmlFor="start_date" className="font-weight-bold mr-2">
                            Start Date: </label>
                        <input type="datetime-local" name="start_date" className="mr-2 input-date" 
                            value={this.state.start_date} onChange={this.handleChange}/>
                        <span className="errors mr-1">
                            {this.state.start_dateError}    
                            {this.state.start_dateError ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>
                        <label htmlFor="end_date" className="font-weight-bold mr-2">
                            End Date: </label>
                        <input type="datetime-local" name="end_date" value={this.state.end_date}
                            className="mr-2 input-date" onChange={this.handleChange}/>
                        <span className="errors">
                            {this.state.end_dateError}    
                            {this.state.end_dateError ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>
                    </div> 
                    <div className="form-row m-1">
                        <label htmlFor="capcity" className="font-weight-bold mr-2">
                            Number of attendees: </label>
                        <input type="number" name="capcity" className="mr-2 input-date"
                            value={this.state.capcity} onChange={this.handleChange}/>
                        <span className="errors mr-1">
                            {this.state.capcityError}    
                            {this.state.capcityError ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>
                        <label htmlFor="workshop_price" className="font-weight-bold mr-2">
                            Price: </label>
                        <input type="number" name="workshop_price" className="mr-2 input-date" 
                            value={this.state.workshop_price} onChange={this.handleChange}/>
                        <span className="errors">
                            {this.state.workshop_priceError}    
                            {this.state.workshop_priceError ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>
                    </div>
                    <div className="form-row m-1">
                        <label htmlFor="workshop_price" className="font-weight-bold mr-2">
                                Category: </label>
                        <select name="category_id" className="form-control" style={{width:"200px"}} 
                            onChange={this.handleChange}>
                            {this.state.categories.map(category => {
                            return (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </option>
                            )
                        })
                        }
                        </select>
                        <span className="errors">
                            {this.state.category_idError}    
                            {this.state.category_idError ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>
                    </div> 
                    <div className="form-row m-2">
                        <label htmlFor="meetings" className="font-weight-bold mr-2">
                        Meeting Join URL: 
                        </label>
                        <button onClick={this.showAlert} className="btn btn-danger font-weight-bold btn-sm mr-2" > 
                            Important Disclaimer
                        </button>
                        <span>For Better understanding kindly watch 
                        <a style={{color:'red',textDecorationLine: 'underline'}} target="_blank"
                        href="https://www.youtube.com/watch?time_continue=67&v=XhZW3iyXV9U&feature=emb_logo"> this video</a> </span>
                        <input type="text" name="meeting_link" className="mr-2 input-link" 
                            value={this.state.meeting_link} onChange={this.handleChange}/>
                        <span className="errors mr-1">
                        {this.state.meeting_linkError}    
                        {this.state.meeting_linkError ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>
                        <label htmlFor="workshops" className="font-weight-bold mr-2">
                            Meeting Password (if exists): </label>
                        <input type="text" name="meeting_password" className="mr-2 input-password" 
                            value={this.state.meeting_password} onChange={this.handleChange}/>
                        <span className="errors">
                        {this.state.meeting_passwordError}    
                        {this.state.meeting_passwordError ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>
                    </div>
                    <div className="form-row m-1">
                        <label htmlFor="meetings" className="font-weight-bold mr-2">
                        Meeting Backup URL (if exists): 
                        </label>
                        <input type="text" name="meeting_backup_link" className="mr-2 input-link" 
                            value={this.state.meeting_backup_link} onChange={this.handleChange}/>
                        <span className="errors">
                        {this.state.meeting_backup_linkError}    
                        {this.state.meeting_backup_linkError ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>
                    </div>
                    <div className="form-row m-1">
                        <label htmlFor="workshops" className="font-weight-bold mr-2">
                            Meeting Backup Password (if exists): </label>
                        <input type="text" name="meeting_backup_password" className="mr-2 input-password" 
                            value={this.state.meeting_backup_password} onChange={this.handleChange}/>
                        <span className="errors">
                        {this.state.meeting_backup_passwordError}    
                        {this.state.meeting_backup_passwordError ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>  
                    </div>
                    <div className="form-row-last">
                        <input type="submit" onClick={this.onWorkshopAdded} 
                            className="btn btn-success font-weight-bold" value="Add" />
                    </div>
                </form>
                </div>
            </div>
        </div>
        );
    }
}


export default Add;