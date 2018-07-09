import React, {Component} from 'react';
import { Query, Mutation } from 'react-apollo';
import {GET_TODOS} from '../queries'
import {DELETE_TODO, UPDATE_TODO} from '../mutations'

class TodoList extends Component {
  
  deleteTodoHandler = (deleteTodo, id) => {
    deleteTodo({variables: {id}})
  }

  updateTodoHandler = (updateTodo, id, text, completed) => {
    updateTodo({variables: {id, text, completed: !completed}})

  }
  render() {
    return (
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
    )
  }
}

export default TodoList;