import React,{ Component} from 'react';
import axios from 'axios';

class AllCategories extends Component {
    constructor(props){
        super(props)
            
        this.state = { 
            categories: [], 
        }
    }

    handleChange = ({target}) =>{
        this.setState({ ...this.state, [target.name]: target.value });
        console.log(target);   
    };
        
    componentDidMount (){ 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/categories').then(res => {
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
            axios.delete('http://localhost:8000/api/categories/'+ categoryId).then(res => {
                console.log(res.data);
			    let categories = this.state.categories;
                function removeCategory(arr, value) {
                    return arr.filter((category)=>{
                    return category.category_id !== value; });
                }
            
                this.setState({categories:removeCategory(categories,categoryId)});     
                       
        }).catch(error => {
            console.log(error.response)
        }); 
    });
};

render() { 
    return ( 
    <div className="container">
        <table className="table border border-dark">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category Name</th>   
                </tr>
            </thead>
            <tbody>
                {this.state.categories.map(category => { return (
                    <tr key={category.category_id} className="m-1">
                        <td>{category.category_id}</td>
                        <td>{category.category_name}</td>
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