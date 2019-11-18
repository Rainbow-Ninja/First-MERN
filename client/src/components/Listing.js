import React, { Component } from "react";
import axios from "axios"
import { Row, Col, Card, Button, Input, Modal } from 'antd';
const {TextArea}=Input;
const { Meta } = Card;
class Listing extends Component {
    constructor(props){
        super(props)
        this.state = {
            _id: "",
            // state variables title and description is created to keep track of the blog received from map method which can be passes to other methods in the class such as render-> form-> openModal and closeModal
            title: "",
            description: "",
            // when the modal or the pop up widow is closed set the flag modalisOpen to false
            visible: false
        };
    }
    openModal = blog => {
        this.setState({
            visible: true,
            _id: blog._id,
            title: blog.title,
            description: blog.description
        });
    };
    closeModal = () => {
        this.setState({
            visible: false
        });
    };

  logChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
};

   

    fetchBlogs = async () => {
        let response = await axios.get('/api/blogs');
        let blogs = response.data
        // console.log( blogs)
        // this.setState({blogs})
        this.props.handleBlogs(blogs);
    }



    // make an api call to fetch all the blogs from backend
    // CDM runs after render, this is the best place to make any api call
    componentDidMount() {
        this.fetchBlogs();
    }

    remove = blog => {
        axios
            .delete("/api/blogs", { data: blog })
            .then(() => {
                // instead of making a get request to fetch blogs again loop through the existing blogs in the state (App.js) and pass the blog that matches the id requested
                // a callback method in App.js is called to remove the blog from existing blogs in the state
                this.props.handledeletedBlog(blog._id);
            })
            .catch(console.log);
    };

    render() {
        const {blogs} = this.props
        return (
            <div>
                <Row>
                    {blogs.map(blog => (
                        <div>
                            <Col span={6}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src="https://www.anita.com/blog/us/wp-content/uploads/sites/3/2016/02/blog-success.jpg" />}
                                >
                                    <Meta title={blog.title} description={blog.description} />
                                    <Button type="primary" onClick={() => this.openModal(blog)}>
                                        Edit
                                    </Button>
                                    <Button type="danger" style={{ margin: "0 20px" }} onClick={() => this.remove(blog)}>
                                        Delete
                                    </Button>
                                </Card>
                            </Col>
                            <Modal
                                visible={this.state.visible}
                                onOk={this.this.handleEdit}
                                onCancel={this.closeModal}
                            >
                                <form method="POST">
                                    <Input
                                        placeholder="Title"
                                        allowClear
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.logChange}
                                    />
                                   
                                    <TextArea
                                        placeholder="Description"
                                        allowClear
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.logChange}
                                    />
                                </form>
                            
                            </Modal>
                        </div>
                    ))}
                </Row>
            </div> 
        )
    }
}
export default Listing;