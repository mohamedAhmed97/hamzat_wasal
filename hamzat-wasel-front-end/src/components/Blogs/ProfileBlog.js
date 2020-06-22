import React from 'react';
import axios from 'axios';
import '../blog/blog.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';


export default class ProfileBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: []
        }

    }



    componentDidMount() {

        
        axios.get("http://localhost:8000/api/profile/posts/" + this.props.user.id)
        .then(res => {
        console.log(this.props)

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

                        <div className="container">
                            <div className="grid_12">
                                <article className="post post-blog">
                                    <a href="#" className="post-image">
                                    <img src={process.env.PUBLIC_URL +"/images/blog.jpeg"}  />
                                    </a>
                                    <div className="details">
                                        <Link to={`/blogs/${blog.id}`}>
                                            <h2>Title: {blog.title}</h2>
                                        </Link>


                                        <div className="meta">
                                            <h4>Category: <strong> {blog.categoryinfo.category_name} </strong> <span className="verified"></span></h4>
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