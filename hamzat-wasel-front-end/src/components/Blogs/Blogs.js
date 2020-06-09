import React from 'react'; 
import axios from 'axios';

/*export class Blogs extends React.Component
{
    constructor(props) 
    {
        super(props)
        this.state ={
            blogs: []
        }
    }
    
    componentDidMount() {
        axios.get("http://localhost:8000/api/posts")
        .then(res=> {
            console.log(res.data)
            this.setState({
                blogs: res.data.data
                //blogs: res.data
            })
        })
        console.log(this.state.blogs);
    }
    
    render(){    
         return(
             
            <div>
                {this.state.blogs.map((blog)=>
                
                (
                    <p>Hello from!</p>
                )
           
            
            )}
            </div>
        );
            
    }
    
}*/


export class Blogs extends React.Component
{
    state={
        blogs: []
    }
     
    componentDidMount() {
        axios.get("http://localhost:8000/api/posts")
        .then(res=> {
            console.log(res.data)
            this.setState({
                blogs: res.data.data
                //blogs: res.data
            })
        })
        console.log(this.state.blogs);
    }

    render()
    {
        const{blogs}=this.state
        const blogItem = blogs.map((blog,index)=>{
            return(
                <div key={index}>
                   
                    <div className="content">
                        
                        <div> <h3>Title: {blog.title}</h3>
                            <h3> Description: {blog.description}</h3>
                            <h4>Category:  </h4></div>
                           
                   
                                
                    </div>
                    
                </div>
            )});
        return blogItem;
    }
}

       