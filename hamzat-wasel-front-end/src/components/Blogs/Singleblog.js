import React from 'react'; 
import axios from 'axios';
import '../blog/blog.css';
import queryString from 'querystring';
import '../blog/blog.css';

export class Singleblog extends React.Component
{
    
    state={
        blog: [],
        userinfo: [], 
        categoryinfo: []
    }
    componentDidMount() {
        //console.log(this.props.location.search);
       

        axios.get('http://localhost:8000/api/posts/' + this.props.match.params.id)
        .then(res=> {
            console.log(res.data.data)
            this.setState({
                blog: res.data.data,
                userinfo: res.data.data.userinfo,
                categoryinfo: res.data.data.categoryinfo
                //blogs: res.data
            })
        })
        //console.log(this.state.blog.userinfo);
    }
    render()
    {
        
       
            return(
                
          <div>  
            <article class="container">
                <div class="container"> 
                  <h1>Title: {this.state.blog.title}</h1>
                </div>
                <div>
                <a href="#" className="post-image">
                <img src="http://placehold.it/960x250/efefef" />
                </a>
                </div>
                <div class="browser">
                    <h3>Writter name: {this.state.userinfo.name} </h3>
                    <h5>Category name: {this.state.categoryinfo.category_name}</h5>
                     <p>article description: 
                            {this.state.blog.description}
                           
                           </p>
                    
                </div> 
            </article>   
        </div>
        
            )
     
    }
}
