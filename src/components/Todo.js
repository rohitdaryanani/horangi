import React, {Component} from 'react';
import { Query, Mutation } from 'react-apollo';
import {GET_TODOS} from '../queries'
import {ADD_TODO, DELETE_TODO, UPDATE_TODO} from '../mutations'
import TodoList from './TodoList'

class Todo extends Component {
  state = {
    todoText: ''
  }

  addTodoHandler = (event, addTodo) => {
    const {todoText} = this.state;
    event.preventDefault();
    addTodo({variables: {text: todoText}})
    this.setState({ todoText: '', })
  }

  deleteTodoHandler = (deleteTodo, id) => {
    deleteTodo({variables: {id}})
  }

  updateTodoHandler = (updateTodo, id, text, completed) => {
    updateTodo({variables: {id, text, completed: !completed}})

  }
  render() {
    return (
      <div>
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
            <form onSubmit={(event) => this.addTodoHandler(event, addTodo)}>
              <input 
                type="text" 
                name="todo" 
                value={this.state.todoText} 
                onChange={event => this.setState({ todoText: event.target.value })}
              />
            </form>
          )}
        </Mutation>
        <TodoList />
      </div>
    )
  }
}

export default Todo;