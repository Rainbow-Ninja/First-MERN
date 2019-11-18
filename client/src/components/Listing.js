import React, { Component } from "react";
import axios from "axios"
class Listing extends Component {
    constructor(props){
        super(props)
    }

    fetchBlogs = async () => {
        let response = await axios.get('/api/blogs');
        let blogs = response.data
        this.props.handleBlogs(blogs);
    }
    // make an api call to fetch all the blogs from backend
    // CDM runs after render, this is the best place to make any api call
    componentDidMount() {
        this.fetchBlogs();
    }
    render() {
        return (
            <div>
                {this.props.blogs.map(blog => {
                    return( <div>
                        <h3>{blog.title}</h3><br></br>
                        <p>{blog.description}</p>
                    </div> )
                })}
            </div>
        )
    }
}
export default Listing