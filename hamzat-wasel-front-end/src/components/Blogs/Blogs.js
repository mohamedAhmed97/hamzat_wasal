import React from 'react';
import axios from 'axios';
import '../blog/blog.css';
import { Singleblog } from '../Blogs/Singleblog';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';
import config from '../token/token';

const cookies = new Cookies();

export class Blogs extends React.Component {
    current_user = cookies.get('UserData');
    constructor(props) {
        super(props);
        console.log(this.current_user);
        this.state = {
            blogs: [],
           

        }
    }

    componentDidMount() {
        axios.get("http://localhost:8000/api/posts")
            .then(res => {
                console.log(res.data)
                this.setState({
                    blogs: res.data.data
                    //blogs: res.data
                })
            })

        console.log(this.state.currentusername);

    }

    onBlogDelete = (id) => {
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {

            axios.delete('http://localhost:8000/api/posts/' + id, config).then(res => {
                console.log(res.data);
                let blogs = this.state.blogs;
                function removeblog(arr, value) {
                    return arr.filter((blog) => {
                        return blog.id !== value;
                    });
                }

                this.setState({ blogs: removeblog(blogs, id), alert_message: "success" });
                setTimeout(() => this.setState({ alert_message: '' }), 9000);

            }).catch(error => {
                this.setState({ alert_message: "error" });
                setTimeout(() => this.setState({ alert_message: '' }), 9000);
                console.log(error)
            }
            );

        });
    }


    render() {


        const { blogs } = this.state;

        const blogItem = blogs.map((blog, index) => {

            return (
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
                                        <div>
                                            {
                                                (this.currentusername === blog.userinfo.name) ?

                                                    <button onClick={() => this.onBlogDelete(blog.id)} className="btn btn-danger font-weight-bold m-1 mybtn3">
                                                        it's one of your posts, do you want to delete it? </button>
                                                    : ""}
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>

                    </div>
                </div>

            )
        });


        return (
            <div class="container">
                <div className="mb-3 text-center">
                    {this.current_user!=null ?
                        <Link to={`/blogs/addblog`}>
                            <button type="button" className="btn btn-info btn-lg mr-3 mybtn2" >Add a new post? </button>
                        </Link>
                        :
                        <Link to={`/login`}>
                        <button type="button" className="btn btn-info btn-lg mr-3 mybtn2" >login to Add a new post? </button>
                    </Link>
                    }

                </div>
                {blogItem}
            </div>
        );



    }
}
