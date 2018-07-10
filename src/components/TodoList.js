import React, {Component} from 'react';
import { Query, Mutation } from 'react-apollo';
import {GET_TODOS} from '../queries'
import {DELETE_TODO} from '../mutations'
import EditTodo from './EditTodo'
import DeleteTodo from './DeleteTodo'

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
            <div className="todo-list">
              <ul>
              {data.todos.map(({id, text, completed}) => (
                <li className="todo-item" key={id}>
                  <EditTodo id={id} text={text} completed={completed} />
                  <DeleteTodo id={id} completed={completed}/>
                </li>
              ))}
              </ul>
            </div>
          );
        }}
      </Query>
    )
  }
}

export default TodoList;