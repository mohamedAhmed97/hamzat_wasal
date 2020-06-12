import React from 'react'; 
import axios from 'axios';
import '../blog/blog.css';
import {BrowserRouter as Router, Link } from 'react-router-dom';
import {Addblog} from '../Blogs/Addblog';

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
        
        
        const{blogs}=this.state;
        
        const blogItem = blogs.map((blog,index)=>{
            return(
                <div class="text-center container"> 
                  
                    


                 
                <div key={index}>
                    
                <div class="container">
                           <div class="grid_12">
                           <article class="post post-blog">
                             <a href="#" className="post-image">
                            <img src="http://placehold.it/960x250/efefef" />
                            </a>
                               <div class="details">
                               <Link to={`/blogs/${blog.id}`}>
                               <h2>Title: {blog.title}</h2> 
                                </Link>  
                               
                               
                               <div class="meta">
                                   <h4>Category: <strong> {blog.categoryinfo.category_name} </strong> <span class="verified"></span></h4>
                               </div>
                               </div>
                           </article> 
                           </div>          
                   </div>
                   
                   </div>
                   </div>

            )});
            
            
        return (
            <div class="container">
                <div className="mb-3 text-center"> 
            <Link to ={`/blogs/addblog`}>
                <button type="button" className="btn btn-info btn-lg mr-3 mybtn2" >Add a new post? </button>
            </Link>
            </div>
            {blogItem}
            </div>
            );


        
    }
}

       /*
  
        <Router>
            <div className="text-center">
                    <Link to="/categories">
                        <button className="btn btn-primary m-3 p-2"> All Categories</button></Link>
                    <Link to="/categories/add">
                        <button className="btn btn-success p-2">Add Category</button></Link>
                <Switch>
                        <Route exact path="/categories" component={AllCategories} />  
                        <Route exact path="/categories/add" component={Add} /> 
                        <Route path="/categories/edit/:id" component={Edit} />        
                </Switch>
            </div>
        </Router>   
         <div key={index}>
         <div class="container">
                    <div class="grid_12">
                    <article class="post post-blog">
                        <div class="details">
                        <h2><a href="#">Title: {blog.title}</a></h2>
                        <div class="meta">
                            <h4>Category: <strong> </strong> <span class="verified"></span></h4>
                        </div>
                        </div>
                    </article> 
                    </div>          
            </div>
            </div>
       */

       /*
       <div key={index}>
                   
                    <div className="content">
                        
                        <div> <h3>Title: {blog.title}</h3>
                            <h3> Description: {blog.description}</h3>
                            <h4>Category:  </h4></div>
                           
                   
                                
                    </div>
                    
                </div>
                */

                /*
                <div class="container">
                    <div class="grid_12">
                    <article class="post post-blog">
                        <a href="#" class="post-image">
                        <img src="http://placehold.it/960x250/efefef" />
                        </a>
                        <div class="details">
                        <h2><a href="#">iOS Game / Slots</a></h2>
                        <div class="meta">
                            <p>Written by <strong>Mike | Creative Mints</strong> <span class="verified"></span></p>
                        </div>
                        <p>Get your coins ready, it's slots time! Check out the attachment for instant jackpot! :) <br />_<br /><br />P.S The game concept is for sale, please contact me if you're interested.</p>        
                        </div>
                    </article> 
                    </div>          
            </div>
            */