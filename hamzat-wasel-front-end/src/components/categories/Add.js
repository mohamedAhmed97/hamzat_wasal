import React,{ Component} from 'react';
import axios from 'axios';
import AlertSuccess from './AlertSuccess';


class Add extends Component {
    constructor(props){
        super(props)
    
        this.state = {
            name: '', 
            alert_message: '',
        }
    }

    handleChange = ({target}) =>{
        this.setState({ ...this.state, [target.name]: target.value });
        console.log(target);   
    };

    onCategoryAdded = e => {
        e.preventDefault();  
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.post('http://localhost:8000/api/categories',this.state).then(res => {
                console.log(res.data);
                this.setState({alert_message: "success"});
                
            }).catch(error => { 
                this.setState({alert_message: "error"});
                console.log(error)
            }); 
        });
    };


render() { 
        return (    
        <div className="container mt-5">
            {this.state.alert_message === "success" ? 
                <AlertSuccess message="Category is added successfully" /> : ""}
            <form className="border border-success p-3" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="categories" className="font-weight-bold mr-2">
                        Category name: </label>
                    <input type="text" name="name" placeholder="         category name" 
                    className="mr-2" value={this.state.name} onChange={this.handleChange}/>
                </div> 
                <button type="submit" onClick={this.onCategoryAdded} 
                    className="btn btn-success font-weight-bold mr-2"> Add 
                </button>
            </form>
        </div>
        );
    }
}


export default Add;