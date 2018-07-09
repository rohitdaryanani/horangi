import React, {Component} from 'react';
import { Query, Mutation } from 'react-apollo';
import {GET_TODOS} from '../queries'
import {ADD_TODO, DELETE_TODO, UPDATE_TODO} from '../mutations'

class Todo extends Component {
  state = {
    todoText: ''
  }

  submitTodoHandler = (event, addTodo) => {
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
            <form onSubmit={(event) => this.submitTodoHandler(event, addTodo)}>
              <input 
                type="text" 
                name="todo" 
                value={this.state.todoText} 
                onChange={event => this.setState({ todoText: event.target.value })}
              />
            </form>
          )}
        </Mutation>
        <Query query={GET_TODOS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <ul>
              {data.todos.map(({id, text, completed}) => (
                  <li key={id}>
                    <Mutation mutation={UPDATE_TODO}>
                      {(updateTodo, {data, error}) => (
                        <input 
                          type="checkbox" 
                          name="completed" 
                          checked={completed} 
                          onChange={() => this.updateTodoHandler(updateTodo, id, text, completed)}
                        />
                      )}
                    </Mutation>
                    {text}
                    <Mutation mutation={DELETE_TODO} refetchQueries={[{query: GET_TODOS}]}>
                      {(deleteTodo, {data, error}) => (
                        <button 
                          onClick={() => this.deleteTodoHandler(deleteTodo, id)}>
                          Delete
                        </button>
                      )}
                    </Mutation>
                  </li>
              ))}
            </ul>
          );
        }}
        </Query>
      </div>
    )
  }
}

export default Todo;