import React,{ Component} from 'react';
import axios from 'axios';
import AlertSuccess from './AlertSuccess';
import config from '../token/token';

class Edit extends Component {
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            alert_message: '', 
        }
    }

    componentDidMount (){ 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/categories/'+this.props.match.params.id,config).then(res => {
                console.log(res.data.data.category_name);
                this.setState({ name: res.data.data.category_name})
            
            }).catch(error => {
                console.log(error.response)
            }); 
        });
    };

    handleChange = ({target}) =>{
        this.setState({ ...this.state, [target.name]: target.value });
        console.log(target);   
    };

    onSubmit = e => {
        e.preventDefault();  
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.put('http://localhost:8000/api/categories/'+this.props.match.params.id,this.state,config)
            .then(res => {
                console.log(res.data);
                this.setState({alert_message: "success"});
                setTimeout(() => this.setState({alert_message:''}), 7000);
            
            }).catch(error => {
                this.setState({alert_message: "error"});
                console.log(error);
            }); 
        });
    };


render() { 
    return ( 
        <div className="container mt-5">
            {this.state.alert_message === "success" ? 
                <AlertSuccess message={"Category is Updated successfully"} /> : ""}
            <form className="border border-success p-3" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="categories" className="font-weight-bold mr-2">
                            Category name: </label>             
                    <input type="text" name="name" placeholder="category name"
                            className="input-text mr-2" value={this.state.name} 
                            onChange={this.handleChange}/>  
                </div>
                <button type="submit" className="btn btn-success font-weight-bold mr-2"> 
                    Update 
                </button>          
            </form>
        </div>
        );
    }
}


export default Edit;