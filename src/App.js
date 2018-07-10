import React, { Component } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Todo from './components/Todo';
import './App.css';

class App extends Component {
  state = {
    token: ''
  };

  componentDidMount(){
    const token = localStorage.getItem('token') || '';
    this.setState({token})
  }
  render() {
    return (
      <div className="App container">
        <p>{this.state.token.length !== 0 ? 'signout' : 'Register'}</p>
        {this.props.children}
      </div>
    );
  }
}

export default App;
