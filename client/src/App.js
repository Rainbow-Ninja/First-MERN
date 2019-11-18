import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu} from "antd";
import './App.css';
import Form from "./components/Form";
import Listing from "./components/Listing";

const { Header, Content, Footer} = Layout;

class App extends Component {
  //parent component holds the state which is updated by both children, form and listing components
  state={
    blogs: []
  }

  //method that gets called each time a new blog is added from form component
  handleNewBlog = (blog) => {
    this.setState({
      blogs: [...this.state.blogs, blog]
    })
  }

  //method passed to listing component, which gets called when a get request is made to the server to retieve all the blogs at the start of the app
  handleBlogs = (blogs) => {

  }

  handledeletedBlog = id => {
    // create a copy of the existing blogs array
    const index = this.state.blogs.findIndex(blog => blog._id === id);
    const blogs = [...this.state.blogs];
    blogs.splice(index, 1);
    this.setState({
        blogs: blogs
    });
};

handleEdit = e => {
          e.preventDefault();
          // create a variable that should be passed to the database
          var blog = {
              _id: this.state._id,
              title: this.state.title,
              description: this.state.description
          };
          axios
              .put("/api/blogs", blog)
              .then(response => {
                  const updatedBlogs = this.props.blogs.map(blog => {
                      if (blog._id === response.data._id) {
                          return response.data;
                      }
                      return blog;
                  });
                  // close the pop up window
                  this.closeModal();
                  // update the state with new set of blogs
                  this.props.handleBlogs(updatedBlogs);
              })
              .catch(err => console.log(err));
      };

  render() {
    const {blogs} = this.state;
    return (
      <div className="App">
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">MERN APP</Menu.Item>
              <Menu.Item key="2">Sign in with google</Menu.Item>
              <Menu.Item key="3">Dashboard</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              {/* form component to add new blog */}
              <Form handleNewBlog={this.handleNewBlog} />
              <Listing blogs={blogs} handleBlogs={this.handleBlogs} handledeletedBlog=(this.handledeltedBlog}/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', position: 'sticky', bottom: "0" }}>Hello Footer</Footer>
        </Layout>
      </div>
    );
  }
  
}

export default App;
