import Cookies from 'universal-cookie';
import axios from 'axios';
import config from './token';

const cookies = new Cookies();

const UserData = () => {
    //return user data
    
    axios.get('http://localhost:8000/api/user', config).then(res => {
        
        
        //save cookie
        cookies.set('UserData', res.data, { path: '/', expires: new Date(Date.now() + 2592000) });
        //console.log(cookies.get('UserData'));
    }).catch(error => {
        console.log(error.response)
    });
}

export default UserData ;