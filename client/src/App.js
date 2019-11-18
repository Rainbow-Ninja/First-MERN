import React, {Component} from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import Button from 'antd/es/button';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>BLOG</h1>
        <Button type="primary">Bloggity</Button>
      </div>
    );
  }
  
}

export default App;
