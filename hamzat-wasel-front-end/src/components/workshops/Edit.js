import React,{ Component} from 'react';
import axios from 'axios';
import config from '../token/token';
import Cookies from 'universal-cookie';
import AlertSuccess from '../categories/AlertSuccess';


class Edit extends Component {
    constructor(props){
        super(props)

        const cookies = new Cookies();
        const current_user = cookies.get('UserData');
        console.log(current_user.id);

        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            title: '',
            description: '',
            start_date: '',
            end_date: '',
            capcity: '',
            workshop_price: '',
            user_id: current_user.id,
            category_id: '1',
            categories:[],
            alert_message: '',
        }
    }

    componentDidMount (){ 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/categories',config).then(res => {
                console.log(res.data.data);
                this.setState({ categories: res.data.data})
                    
            }).catch(error => {
                console.log(error.response)
            }); 
        });

        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/workshops/'+this.props.match.params.id,config).then(res => {
                console.log(res.data.data);
                console.log(res.data.data.start_date);
                
                this.setState({ 
                    title: res.data.data.title,
                    description: res.data.data.description,
                    start_date: res.data.data.start_date,
                    end_date: res.data.data.end_date,
                    capcity: res.data.data.capcity,
                    workshop_price: res.data.data.workshop_price,
                    category_id: res.data.data.category_id,
            })

            }).catch(error => {
                console.log(error)
            }); 
        });
    
    };

    handleChange = ({target}) =>{
        this.setState({ ...this.state, [target.name]: target.value });
        console.log(target.name);
        console.log(target.value);
        console.log(this.state);   
    };

    onSubmit = e => {
        e.preventDefault();  
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.put('http://localhost:8000/api/workshops/'+this.props.match.params.id,this.state,config)
            .then(res => {
                console.log(res.data);
                this.setState({alert_message: "success"});

            }).catch(error => {
                this.setState({alert_message: "error"});
                console.log(error);
            }); 
        });
    };


render() {
    console.log(this.state);  
    return (     
    <div className="container">
        {this.state.alert_message === "success" ? 
                <AlertSuccess message="Workshop Updated successfully" /> : ""}
        <div className="page-content">
		    <div className="form-v7-content">
                <form className="border border-success p-3 form-detail" onSubmit={this.onSubmit}>
                    <div className="form-row ml-2">
                        <label htmlFor="title" className="font-weight-bold mr-2">
                            Name: </label>
                        <input type="text" name="title" className="mr-2 input-text" 
                            value={this.state.title} onChange={this.handleChange}/>
                    </div> 
                    <div className="form-row ml-2">
                        <label htmlFor="workshops" className="font-weight-bold mr-2">
                            Description: </label>
                        <input type="text" name="description" className="mr-2 input-text" 
                            value={this.state.description} onChange={this.handleChange}/>
                    </div> 
                    <div className="form-row ml-2">
                        <label htmlFor="start_date" className="font-weight-bold mr-2">
                            Start Date: </label>
                        <input type="datetime-local" name="start_date" className="mr-2 input-text" 
                            value={this.state.start_date} onChange={this.handleChange}/>
                    </div> 
                    <div className="form-row ml-2">
                        <label htmlFor="end_date" className="font-weight-bold mr-2">
                            End Date: </label>
                        <input type="datetime-local" name="end_date" value={this.state.end_date}
                            className="mr-2 input-text" onChange={this.handleChange}/>
                    </div> 
                    <div className="form-row ml-2">
                        <label htmlFor="capcity" className="font-weight-bold mr-2">
                            Number of attendees: </label>
                        <input type="number" name="capcity" className="mr-2 input-text"
                            value={this.state.capcity} onChange={this.handleChange}/>
                    </div>
                    <div className="form-row ml-2">
                        <label htmlFor="workshop_price" className="font-weight-bold mr-2">
                            Price: </label>
                        <input type="number" name="workshop_price" className="mr-2 input-text" 
                            value={this.state.workshop_price} onChange={this.handleChange}/>
                    </div>
                    <div className="form-row ml-2">
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
                    </div> 
                    <div className="form-row-last">
                        <input type="submit" className="btn btn-success font-weight-bold" value="Update" />
                    </div>
                </form>
            </div>
        </div>
    </div>
        );
    }
}


export default Edit;