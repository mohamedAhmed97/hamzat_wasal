import React from 'react';
import axios from 'axios';
import '../blog/blog.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';


export default class ProfileBlog extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props)
        this.state = {
            blogs: []
        }

    }



    componentDidMount() {

        
        axios.get("http://localhost:8000/api/profile/posts/" + this.props.user.id)
        .then(res => {
            //console.log(res.data)
            this.setState({
                blogs: res.data.posts
                //blogs: res.data
            })


        })
        

    }

    render() {

        const { blogs } = this.state

        if (blogs) {
            const blogItem = blogs.map((blog, index) => {
                return (
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

                )
            });
            return blogItem;
        }
        else {
            return (null);
        }


    }
}