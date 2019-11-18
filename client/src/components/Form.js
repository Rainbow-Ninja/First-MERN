import React, {Component} from "react";
import {Input} from "antd";
//similar to fetch, it's a promise based XHR library to make HTTP requests
import axios from "axios";

const {TextArea} = Input;

export default class Form extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: "",
            description: ""
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    onSubmit = e => {
        e.preventDefault();
        console.log(e);
        //make a post request to the server
        axios.post("/api/blogs", {
            title: this.state.title,
            description: this.state.description
        })
        .then((response) => {
            console.log(response)
            //call the function passed by the parent to take a local copy of the blog
            this.props.handleNewBlog(response.data)
        })
        .catch(err => (console.log(err)))
    }

    render() {
        return (
            <div>
                <form>
                    <Input placeholder="input with clear icon" allowClear name="title" onChange={this.onChange} />
                    <br />
                    <br />
                    <TextArea placeholder="textarea with clear icon" allowClear name="description" onChange={this.onChange} />
                    <Input placeholder="input with clear icon" allowClear onClick={this.onSubmit} type="submit" value="Add Blog" />
                </form>
            </div>
        )
    }
}