import React from 'react';
import axios from 'axios';
import '../../Form.css'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';
import UserData from '../token/userdata';
import { useAlert } from 'react-alert'


function Login() {
    const cookies = new Cookies();
    const alert = useAlert()
    let role = '';
    const [state, setState] = React.useState(
        {
            email: '',
            password: '',
            device_name: 'web',
            redirect: false,
        });

    const handleChange = ({ target }) => {
        setState({ ...state, [target.name]: target.value });
    };
    //redirect function
    const ProtectedComponent = (data) => {
        if (state.redirect) {
            if (data === 0) {
                return <Redirect to='/home' />
            }
            return <div> My Protected Component </div>
        }

    }

    const onSubmit = e => {
        e.preventDefault();
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            axios.post('http://localhost:8000/api/login', state).then(res => {
                cookies.set('UserToken', res.data, { path: '/', expires: new Date(Date.now() + 2592000) });
                role = cookies.get('UserToken');
                UserData(res.data);
                setState({ ...state, redirect: true })
            }).catch(error => {
                // console.log(error);
                alert.error("Error in login Check Your Data Please");
                        
            });
        });
    };

    return (
        <React.Fragment>
            {ProtectedComponent(0)}
            <div className="container mb-3">
                <div className="page-content">
                    <div className="form-v7-content">
                        <div className="form-left">
                            <img src="images/login.gif" className="m-lg-5 p-1" alt="login" />
                        </div>
                        <form className="form-detail" onSubmit={onSubmit} id="myform">
                            <h3 className="font-weight-bold mb-5 p-2 text-white text-center"
                                style={{ backgroundColor: "#24c0d1" }}>Login</h3>
                            <div className="form-row">
                                <label htmlFor="email" > E-mail </label>
                                <input type="email" name="email" id="your_email" className="input-text"
                                    value={state.email} onChange={handleChange} required/>
                            </div>
                            <div className="form-row">
                                <label htmlFor="password" className="font-weight-bold"> Password </label>
                                <input type="password" name="password" id="password" className="input-text"
                                    value={state.password} onChange={handleChange} required />
                            </div>
                            <div className="form-row">
                                <input type="hidden" name="device_name" className="input-text"
                                    value={state.device_name} onChange={handleChange} />
                            </div>
                            <div className="form-row-last">
                                <input type="submit" value="Login" className="login btn font-weight-bold" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}



export default Login;