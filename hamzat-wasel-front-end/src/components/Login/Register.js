import React from 'react';
import axios from 'axios';

function Register(){
    const [state, setState] = React.useState(
        {
            name:'',
            email: '',
            password:'',
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
    
    const onSubmit = e => {
        e.preventDefault();   
        // axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log(response);
            axios.post('http://localhost:8000/api/register',state).then(res => {
                console.log(res.data);
                
            }).catch(error => {
                console.log(error.response)
            }); 
        // });
    };
        
    return ( 
            <div className="container">
                <div className="base-container bg-info m-1 text-center p-2 border border-primary">
                    <div className="header">
                        <h2 className="badge-pill badge-primary font-weight-bold mt-3 p-1">Register</h2>
                    <img src="data:image/jpeg;base64,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"
                         className="rounded-circle m-3 p-1 img-fluid" alt="register"/>
                    </div>
                    <div className="content">  
                        <form className="form" onSubmit={onSubmit}>
                            <div className="container">              
                                <div className="form-group">
                                    <label htmlFor="name" className="font-weight-bold text-white"> 
                                    Username </label> 
                                    <input type="text" name="name" placeholder="username" 
                                        className="form-control" value={state.name} 
                                        onChange={handleChange}/> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="font-weight-bold text-white"> 
                                    Email </label> 
                                    <input type="email" name="email" placeholder="email" 
                                        className="form-control" value={state.email} 
                                        onChange={handleChange}/> 
                                </div>
                                <div className="form-group">
                                    <label htmlFor="avatar" className="font-weight-bold text-white">
                                        Avatar </label> 
                                    {/* <input type="file" name="avatar" placeholder="avatar" 
                                        value={state.avatar} onChange={(e)=>onChange(e)}/>  */}
                                    <input type="file" name="avatar" placeholder="avatar" 
                                            className="form-control-file" value={state.avatar} 
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



 