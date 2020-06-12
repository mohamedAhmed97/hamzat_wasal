import React,{ Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AlertSuccess from './AlertSuccess';
import config from '../token/token';
import Pagination from './Pagination';

class AllCategories extends Component {
    constructor(props){
        super(props)
            
        this.state = { 
            categories: [], 
            alert_message: '',
            total: '',
            current_page: 1,
            per_page: '',
            last_page: ''
        }
    }

    handleChange = ({target}) =>{
        this.setState({ ...this.state, [target.name]: target.value });
        console.log(target);   
    };
        
    componentDidMount (){ 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/categories?page='+this.state.current_page,config).then(res => {
                // console.log(res.data);
                this.setState({ 
                    categories: res.data.data,
                    total: res.data.meta.total,
                    current_page: res.data.meta.current_page,
                    per_page: res.data.meta.per_page,
                    last_page: res.data.meta.last_page
                })
                    
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
    const { last_page, per_page } = this.state;
    const indexOfLastCategory = last_page;
    const indexOfFirstCategory = indexOfLastCategory - per_page;
    this.state.categories.slice(indexOfFirstCategory, indexOfLastCategory);

    const paginate = pageNum => {
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/categories?page='+(this.state.current_page=pageNum),config).then(res => {
                console.log(res.data);
                this.setState({ 
                    categories: res.data.data,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                    current_page: pageNum  
                })
                    
            }).catch(error => {
                console.log(error.response)
            }); 
        });
    };

    const nextPage = () => { 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/categories?page='+(this.state.current_page+1),config).then(res => {
                console.log(res.data);
                this.setState({ 
                    categories: res.data.data,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                    current_page: this.state.current_page + 1  
                })
                    
            }).catch(error => {
                console.log(error.response)
            }); 
        });
    }
        

    const prevPage = () => {
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/categories?page='+(this.state.current_page-1),config).then(res => {
                console.log(res.data);
                this.setState({ 
                    categories: res.data.data,
                    total: res.data.meta.total,
                    per_page: res.data.meta.per_page,
                    current_page: this.state.current_page - 1  
                })
                    
            }).catch(error => {
                console.log(error.response)
            }); 
        });

    }
    
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
        <Pagination per_page={per_page} total={this.state.total} paginate={paginate} 
            nextPage={nextPage} prevPage={prevPage} />
    </div>
    );
    }
}

 
export default AllCategories;