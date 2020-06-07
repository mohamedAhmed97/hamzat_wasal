import React, { useRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../../Form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

function Register(){
    const { register, handleSubmit, errors, watch } = useForm();
    const password = useRef({});
          password.current = watch("password", "");
    const [state, setState] = React.useState(
        {
            name:'',
            email: '',
            password:'',
            password_confirmation: '',
            avatar: ''
        });

    const handleChange = ({target}) =>{
        setState({ ...state, [target.name]: target.value });
        console.log(target);
    };

    const onAvatarChange = (e) =>{
    console.log(e.target.files[0]); 
      setState({ ...state, [e.target.name]: e.target.files[0]});
    }

    const onSubmit = e => {
        // e.preventDefault();   
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
          console.log(state);
          var formData = new FormData(); 
          formData.append("avatar", state.avatar); 
          formData.append("email", state.email); 
          formData.append("name", state.name); 
          formData.append("password", state.password); 
          formData.append("password_confirmation", state.password_confirmation);
          axios({ method: 'post', url: 'http://localhost:8000/api/register', data: formData, 
                  headers: {'Content-Type': 'multipart/form-data' } } ).then(res => {
                console.log(res);
        
            }).catch(error => {
                console.log(error.response)
            }); 
        });
};
        
return (
    <div className="container mb-3">
        <div className="page-content">
            <div className="form-v7-content">
                <div className="form-left">
                    <img src="images/login.gif"
                         className="m-lg-5 p-1 img-fluid" alt="register"/>
                </div>
                <form className="form-detail" id="myform" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-weight-bold mb-5 p-2 text-white text-center"
                        style={{backgroundColor: "#24c0d1"}}>Register</h3>
                    <div className="container">              
                        <div className="form-row">
                            <label htmlFor="name" className=" font-weight-bold"> Username </label>
                            <input type="text" name="name" className="input-text" 
                                   onChange={handleChange} ref={register({ required: true, minLength:3 })} />
                            <span className="errors">
                                {errors.name && errors.name.type ===  'required' && 
                                'Username is required, you have to fill it!'}
                                {errors.name && errors.name.type ===  'minLength' && 
                                'Username must be at least 3 characters'}
                                {errors.name ?(<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                            </span>
                        </div>
                        <div className="form-row">
                            <label htmlFor="email" className=" font-weight-bold"> Email </label>
                            <input type="email" name="email" className="input-text" 
                                   onChange={handleChange} ref={register({ required: true, 
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} /> 
                            <span className="errors">
                                {errors.email && errors.email.type ===  'required' && 
                                'Email is required, you have to fill it!'}
                                {errors.email && errors.email.type ===  'pattern' && 
                                'The email format is invalid, the format must be like EX: mayar@gmail.com'}
                                {errors.email ?(<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                            </span>
                        </div>
                        <div className="form-row">
                            <label htmlFor="avatar" className=" font-weight-bold"> Avatar </label> 
                            <input type="file" name="avatar" className="input-file" 
                                   onChange={onAvatarChange} ref={register({ required: true ,
                                   pattern:/^([a-zA-Z0-9\s_\\.\-\\:])+(.jpeg|.png|.jpg|.gif|.svg)$/i })} /> 
                            <span className="errors">
                                {errors.avatar && errors.avatar.type ===  'required' && 
                                'Avatar is required, you have to choose your avatar'}
                                {errors.avatar && errors.avatar.type ===  'pattern' && 
                                'Avatar must be a file of type: jpeg, png, jpg, gif, svg ONLY'}
                                {errors.avatar ?(<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}
                            </span>
                        </div>
                        <div className="form-row">
                            <label htmlFor="password" className=" font-weight-bold "> Password </label> 
                            <input type="password" name="password" className="input-text" 
                            onChange={handleChange} ref={register({ required: true , minLength:6})} /> 
                            <span className="errors"> 
                                {errors.password && errors.password.type ===  'required' && 
                                'Password is required, you have to fill it!'} 
                                {errors.password && errors.password.type ===  'minLength' && 
                                'Password must be at least 6 characters'}
                                {errors.password ?(<FontAwesomeIcon className="ml-2" icon={faTimesCircle} />) : ""}               
                            </span> 
                        </div>
                        <div className="form-row">
                            <label htmlFor="password_confirmation" className=" font-weight-bold"> 
                                   Password Confirmation </label> 
                            <input type="password" name="password_confirmation" className="input-text" 
                                   onChange={handleChange} ref={register({ required: true , minLength:6 
                                    ,validate: value => value === password.current })} /> 
                            <span className="errors">
                                {errors.password_confirmation && 
                                errors.password_confirmation.type ===  'required' && 
                                'Password confirmation is required, you have to fill it!'}
                                {errors.password_confirmation && 
                                errors.password_confirmation.type ===  'minLength' && 
                                'Password confirmation must be at least 6 characters'}
                                {errors.password_confirmation && 
                                errors.password_confirmation.type ===  'validate' && 
                                'Password confirmation does not match'}
                                {errors.password_confirmation ?(<FontAwesomeIcon className="ml-2" 
                                icon={faTimesCircle} />) : ""}         
                            </span>
                        </div>
                        <div className="form-row-last">
                            <input type="submit" value="Register" className="login btn font-weight-bold"/>
                        </div> 
                    </div>  
                </form>
            </div> 
        </div>
    </div>
        );
}

 
export default Register;





 