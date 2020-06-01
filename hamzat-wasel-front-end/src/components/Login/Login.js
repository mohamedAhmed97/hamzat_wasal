import React from 'react';
import axios from 'axios';


function Login(){
    const [state, setState] = React.useState(
        {
            email: '',
            password: ''
        });

    const handleChange = ({target}) =>{
        setState({ ...state, [target.name]: target.value });
        console.log(target);   
    };

    const onSubmit = e => {
        e.preventDefault();  
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.post('http://localhost:8000/api/login',state).then(res => {
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
                        <h2 className="badge-pill badge-primary font-weight-bold mt-3 p-1">Login</h2>
                        <img src="images/login.gif"
                        className="rounded-circle m-3 p-1 img-fluid" alt="login" />
                    </div>
                    <div className="container">
                        <form className="form" onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="username" className="font-weight-bold text-white">
                                       Email </label> 
                                <input type="email" name="email" placeholder="email"
                                       className="form-control" value={state.email} 
                                       onChange={handleChange}/> 
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="font-weight-bold text-white"> 
                                       Password </label> 
                                <input type="password" name="password" placeholder="password"
                                       className="form-control" value={state.password} 
                                       onChange={handleChange}/> 
                            </div>
                            <div className="footer">
                                <button type="submit" value="Login" 
                                        className="btn btn-primary font-weight-bold btn-lg"> Login
                                </button>
                            </div>   
                        </form>
                    </div>     
                </div>
            </div>
         );
}


 
export default Login;