import React, { useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import AlertSuccess from './AlertSuccess';
import config from '../token/token';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../../Form.css';


function Add (){
    const { register, handleSubmit, errors } = useForm();
    const [state, setState] = useState({
        name: '', 
        alert_message: '',
    });

    const handleChange = ({target}) =>{
        setState({ ...state, [target.name]: target.value });

        console.log(target);   
    };

    const onCategoryAdded = () => { 
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.post('http://localhost:8000/api/categories',state,config).then(res => {
                console.log(res.data);
                setState({alert_message: "success"});
                setTimeout(() => setState({alert_message:''}), 2000);
                
            }).catch(error => { 
                setState({alert_message: "error"});
                setTimeout(() => setState({alert_message:''}), 2000);
                console.log(error)
            }); 
        });
    };



    return (
    <div className="container">
        {state.alert_message === "success" ? 
                <AlertSuccess message="Category added successfully" /> : ""}
        <div className="page-content">
		    <div className="form-v7-content">
                <form className="border border-info p-3 form-detail" 
                    onSubmit={handleSubmit(onCategoryAdded)}>
                    <div className="form-row ml-2">
                        <label htmlFor="categories" className="font-weight-bold mr-2">
                            Category name: </label>
                        <input type="text" name="name" className="mr-2 input-text" 
                            onChange={handleChange} ref={register({ required: true, minLength: 3 })}/>
                        <span className="errors">
                            {errors.name && errors.name.type === 'required' &&
                                'Category name is required, you have to fill it!'}
                            {errors.name && errors.name.type === 'minLength' &&
                                'Category name must be at least 3 characters'}
                            {errors.name ? (<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                        </span>
                    </div> 
                    <button type="submit" className="btn btn-success font-weight-bold mr-2">
                        Add 
                    </button>
                </form>
            </div>
        </div>
    </div>
        );
}


export default Add;