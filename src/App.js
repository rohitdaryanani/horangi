import React, { Component } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Todo from './components/Todo';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Signup />
        <Login />
        <Todo />
      </div>
    );
  }
}

export default App;
