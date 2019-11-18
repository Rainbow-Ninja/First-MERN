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
              <Listing blogs={blogs} handleBlogs={this.handleBlogs}/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', position: 'sticky', bottom: "0" }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </div>
    );
  }
  
}

export default App;
