import React from 'react'; 
import axios from 'axios';

export class Blogs extends React.Component
{
    state ={
        users: []
    }
    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res=> {
            console.log(res.data)
            this.setState({
                users: res.data
                //blogs: res.data
            })
        })
    }
    

    /*test=()=>{
    
    
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res=>
            {
                console.log(res);
            }).catch(error=>{
                console.log(error.response)
            });
    });
    }*/
    render(){
        
        //const{blogs}=this.stat
        const {users}=this.state
        let userList
        //let blogList
        //return bloglist=blogs.map(blog=> )
        return userList= users.map(user => {
         return(
            <div key={user.id}>
                
                <div className="content">
                    
                    <div> <h3>Title: {user.name}</h3></div>
                    <div> <h5>Category:{user.username}</h5></div>           
                  </div>
            </div>
        );
    })
    }
}
       