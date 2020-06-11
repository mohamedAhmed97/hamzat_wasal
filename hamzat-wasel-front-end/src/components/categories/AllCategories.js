import React,{ Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AlertSuccess from './AlertSuccess';
import config from '../token/token';

class AllCategories extends Component {
    constructor(props){
        super(props)
            
        this.state = { 
            categories: [], 
            alert_message: ''
        }
    }

    handleChange = ({target}) =>{
        this.setState({ ...this.state, [target.name]: target.value });
        console.log(target);   
    };
        
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
    };


    onCategoryDeleted = categoryId => { 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.delete('http://localhost:8000/api/categories/'+ categoryId,config).then(res => {
                console.log(res.data);
			    let categories = this.state.categories;
                function removeCategory(arr, value) {
                    return arr.filter((category)=>{
                    return category.category_id !== value; });
                }
            
                this.setState({categories:removeCategory(categories,categoryId), alert_message: "success"});     
                setTimeout(() => this.setState({alert_message:''}), 9000);

            }).catch(error => {
                this.setState({alert_message: "error"});
                setTimeout(() => this.setState({alert_message:''}), 9000);
                console.log(error.response)
            });
        });
    };

render() { 
    return ( 
    <div className="container">
        {this.state.alert_message === "success" ? <AlertSuccess message=
        {"You deleted this category successfully, This record isn't a part of the database anymore"} /> : ""}
        <table className="table border border-dark">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category Name</th> 
                    <th scope="col">Actions</th>   
                </tr>
            </thead>
            <tbody>
                {this.state.categories.map(category => { return (
                    <tr key={category.category_id} className="m-1">
                        <td>{category.category_id}</td>
                        <td>{category.category_name}</td>
                        <td>
                            <button onClick={()=>{ if 
                            (window.confirm('Are you sure you want to delete this category?'))
                            this.onCategoryDeleted(category.category_id)}} 
                            className="btn btn-danger font-weight-bold m-1"> Delete </button>
                            <Link to={`/categories/edit/${category.category_id}`}>
                                <button className="btn btn-info font-weight-bold m-1">Edit</button>
                            </Link>
                        </td>
                    </tr>
                    );
                })
                }
            </tbody>
        </table>
    </div>
    );
    }
}

 
export default AllCategories;