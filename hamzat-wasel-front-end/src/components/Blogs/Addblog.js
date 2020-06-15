import React from 'react';
import axios from 'axios';
import '../blog/blog.css';
import config from '../token/token';
import Cookies from 'universal-cookie';
import AlertSuccess from '../alert/AlertSuccess';
//import UserData from '../token/userdata';
//import { TextField } from '@material-ui/core';
export class Addblog extends React.Component
{
    constructor(props)
    {
        super(props)
        const cookies = new Cookies();
        const current_user = cookies.get('UserData');
    this.state={
        title : '', 
        user_id : current_user.id, 
        category_id : '',
        description :'',
        categories:[], 
        alert_message: ''
    }
    }
    componentDidMount (){ 
            axios.get('http://localhost:8000/api/categories', config).then(res => {
                //console.log(res.data.data);
                this.setState({ categories: res.data.data})
            }).catch(error => {
                console.log(error.response)
            }); 
    };
     handleChange = ({ target }) => {
        this.setState({ ...this.state, [target.name]: target.value });
        //console.log(target.value);
    };
    onSubmit = (e)=>{
        e.preventDefault()
        let formdata = new FormData();
        formdata.append('title', this.state.title);
        formdata.append('category_id', this.state.category_id);
        formdata.append('description', this.state.description);
        formdata.append('user_id', this.state.user_id);
        axios.post('http://localhost:8000/api/posts', formdata ,config).then(res => {
            console.log(res.data);
            this.setState({alert_message: "success"}); 
            setTimeout(()=> this.setState({alert_message:''}),7000);
        }).catch(error => { 
            this.setState({alert_message: "error"});
            setTimeout(()=> this.setState({alert_message:''}),7000);
        }
        )
        console.log(this.state);
    }
    render()
    {
        return(
            <div className="container"> 
             {this.state.alert_message === "success" ? 
                <AlertSuccess message="your post was added successfully, you can check it in Blogs section" /> : ""}
            <div className="page-content">
		        <div className="form-v7-content">
                    <form className="border border-success p-3 form-detail" onSubmit={this.onSubmit}>
                    <div className="form-row ml-2">
                        <label htmlFor="workshops" className="font-weight-bold mr-2">
                            Article title </label>
                        <input type="text" name="title" className="mr-2 input-text" onChange={this.handleChange}/>
                    </div> 
                    <br/>
                    <div className="form-row ml-2">
                        <label htmlFor="workshop_price" className="font-weight-bold mr-2">
                                Category: </label>
                        <select name="category_id" className="form-control" style={{width:"150px"}} 
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
                    <br/>   
                    <div className="form-row ml-2">
                    <label htmlFor="workshops" className="font-weight-bold mr-2">
                            Article body </label>
                    <textarea rows="10" cols="90"  name="description" className="mr-2 input-text" onChange={this.handleChange}/>
                    </div> 
                    <br/>
                    <div class="center">
                    <button className="btn btn-success p-2 mybtn" value="submit" name="submit">Submit </button>
                    </div>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}
/*TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" /> */