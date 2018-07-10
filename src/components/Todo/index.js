import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { GET_TODOS } from '../../queries';
import { ADD_TODO } from '../../mutations';
import TodoList from './TodoList';

class Todo extends Component {
  state = {
    todoText: ''
  };

  componentDidMount(){
    const token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    }
  }

  addTodoHandler = (event, addTodo) => {
    const { todoText } = this.state;
    event.preventDefault();
    addTodo({ 
      variables: { text: todoText },
    });
    this.setState({ todoText: '' });
  };

  logoutHandler = () => {
    localStorage.removeItem('token')
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="todo-container">
        <Mutation
          mutation={ADD_TODO}
          update={(cache, { data: { addTodo } }) => {
            const { todos } = cache.readQuery({ query: GET_TODOS });
            cache.writeQuery({
              query: GET_TODOS,
              data: { todos: todos.concat([addTodo]) }
            });
          }}
        >
          {(addTodo, { data, error }) => (
            <div className="add-todo">
              <form onSubmit={event => this.addTodoHandler(event, addTodo)}>
                <div className="input-field">
                  <input
                    autoFocus
                    type="text"
                    name="todo"
                    value={this.state.todoText}
                    required
                    placeholder="e.g Be awesome"
                    onChange={event =>
                      this.setState({ todoText: event.target.value })
                    }
                  />
                  <label>Add Task</label>
                </div>
              </form>
            </div>
          )}
        </Mutation>
        <TodoList />
        <p className="logout-link link-label" onClick={this.logoutHandler}>
        Logout
      </p>
      </div>
    );
  }
}

export default Todo;