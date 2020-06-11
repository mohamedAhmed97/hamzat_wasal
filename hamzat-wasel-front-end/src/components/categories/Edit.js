import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import AlertSuccess from './AlertSuccess';
import config from '../token/token';
import '../../Form.css';

const Edit = props =>{
    const { register, handleSubmit, errors } = useForm();
    const [state, setState] = useState(props);
    
    useEffect(() => {
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.get('http://localhost:8000/api/categories/'+props.match.params.id,config).then(res => {
                console.log(res.data.data.category_name);
                setState({ name: res.data.data.category_name})
            
            }).catch(error => {
                console.log(error.response)
            }); 
        });
    },[props.match.params.id]);

    const handleChange = ({target}) =>{
        setState({ ...state, [target.name]: target.value });
        console.log(target);   
    };

    let onSubmit = e => {
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.put('http://localhost:8000/api/categories/'+props.match.params.id,state,config)
            .then(res => {
                console.log(res.data);
                setState({alert_message: "success"});
                setTimeout(() => setState({alert_message:''}), 2000);
            
            }).catch(error => {
                setState({alert_message: "error"});
                console.log(error);
            }); 
        });
    };

    onSubmit = onSubmit.bind(this);
    return ( 
    <div className="container mt-5">
        {state.alert_message === "success" ? 
            <AlertSuccess message={"Category Updated successfully"} /> : ""}
        <div className="page-content">
		    <div className="form-v7-content">
                <form className="border border-info p-3 form-detail" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row ml-2">
                        <label htmlFor="categories" className="font-weight-bold mr-2">
                                Category name: </label>             
                        <input type="text" name="name" className="input-text mr-2" 
                            defaultValue={state.name} ref={register({ required: true, minLength: 3 })} 
                            onChange={handleChange}/>
                        <span className="errors">
                            {errors.name && errors.name.type === 'required' &&
                                'Category name is required, you have to fill it!'}
                            {errors.name && errors.name.type === 'minLength' &&
                                'Category name must be at least 3 characters'}
                            {errors.name ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>  
                    </div>
                    <button type="submit" className="btn btn-success font-weight-bold mr-2"> 
                        Update 
                    </button>          
                </form>
            </div>
        </div>
    </div>
        );
}


export default Edit;