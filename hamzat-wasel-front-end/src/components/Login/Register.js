import React, { useRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

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

    // const onChange =(e)=>{
    //     setState({ ...state, [e.name]: e.value });
    //     console.log(e.target.files[0].name);
    //     console.log(e.name);     
    //     console.log(e.target.files[0].name);     
    // }
    
    const onSubmit = data => {
        // data.preventDefault();
        console.log(data);
         
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.post('http://localhost:8000/api/register', data).then(res => {
                console.log(res.data);
        
            }).catch(error => {
                console.log(error.response)
            }); 
        });
};
        
    return ( 
            <div className="container">
                <div className="base-container bg-info m-1 text-center p-2 border border-primary">
                    <div className="header">
                        <h2 className="badge-pill badge-primary font-weight-bold mt-3 p-1">Register</h2>
                    <img src="images/register.jpeg"
                         className="rounded-circle m-3 p-1 img-fluid" alt="register"/>
                    </div>
                    <div className="content">  
                        <form className="form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="container">              
                                <div className="form-group">
                                    <label htmlFor="name" className="font-weight-bold text-white"> 
                                        Username </label>
                                    <input type="text" name="name" placeholder="username" 
                                        className="form-control" 
                                        ref={register({ required: true, minLength:3 })} />
                                    <span className="bg-danger m-5">
                                        {errors.name && errors.name.type ===  'required' && 
                                        'Username is required, you have to fill it!'}
                                        {errors.name && errors.name.type ===  'minLength' && 
                                        'Username must be at least 3 characters'}
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="font-weight-bold text-white"> 
                                        Email </label>
                                    <input type="email" name="email" placeholder="email" 
                                        className="form-control" 
                                        ref={register({ required: true, pattern: /(.+)@(.+)\.(.+)/i })} /> 
                                        <span className="bg-danger m-5">
                                            {errors.email && errors.email.type ===  'required' && 
                                            'Email is required, you have to fill it!'}
                                            {errors.email && errors.email.type ===  'pattern' && 
                                            'The email format is invalid, the format must be like EX: mayar@gmail.com'}
                                        </span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="avatar" className="font-weight-bold text-white">
                                        Avatar </label> 
                                    {/* <input type="file" name="avatar" placeholder="avatar" 
                                        value={state.avatar} onChange={(e)=>onChange(e)} ref={register({ required: true })} />  */}
                                    <input type="file" name="avatar" placeholder="avatar" 
                                            className="form-control-file" ref={register({ required: true })} /> 
                                    <span className="bg-danger m-5">
                                            {errors.avatar && errors.avatar.type ===  'required' && 
                                            'Avatar is required, you have to choose your avatar'}
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="font-weight-bold text-white"> 
                                    Password </label> 
                                    <input type="password" name="password" placeholder="password" 
                                           className="form-control" 
                                           ref={register({ required: true , minLength:6})} /> 
                                    <span className="bg-danger m-5">
                                            {errors.password && errors.password.type ===  'required' && 
                                            'Password is required, you have to fill it!'}
                                            {errors.password && errors.password.type ===  'minLength' && 
                                            'The password must be at least 6 characters'}
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password_confirmation" className="font-weight-bold
                                           text-white"> Password Confirmation </label> 
                                    <input type="password" name="password_confirmation"
                                           placeholder="password confirmation" className="form-control" 
                                           ref={register({ required: true , minLength:6 ,validate: value =>
                                            value === password.current })} /> 
                                    <span className="bg-danger m-5">
                                            {errors.password_confirmation && 
                                            errors.password_confirmation.type ===  'required' && 
                                            'Password confirmation is required, you have to fill it!'}
                                            {errors.password_confirmation && 
                                            errors.password_confirmation.type ===  'minLength' && 
                                            'Password confirmation must be at least 6 characters'}
                                            {errors.password_confirmation && 
                                            errors.password_confirmation.type ===  'validate' && 
                                            'Password confirmation does not match'}
                                            
                                    </span>
                                </div>
                                <div className="footer">
                                    <button type="submit" 
                                            className="btn btn-primary font-weight-bold btn-lg"> 
                                            Register
                                    </button>
                                </div> 
                            </div>  
                        </form>
                    </div> 
                </div>
            </div>
        );
}

 
export default Register;



 