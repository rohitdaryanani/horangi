import React, {Component} from 'react';
import { Query, Mutation } from 'react-apollo';
import {GET_TODOS} from '../queries'
import {DELETE_TODO} from '../mutations'
import EditTodo from './EditTodo'

class TodoList extends Component {
  
  deleteTodoHandler = (deleteTodo, id) => {
    deleteTodo({variables: {id}})
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
                    <EditTodo id={id} text={text} completed={completed} />
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