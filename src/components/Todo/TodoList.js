import React, {Component} from 'react';
import { Query } from 'react-apollo';
import {GET_TODOS} from '../../queries'
import EditTodo from './EditTodo'
import DeleteTodo from './DeleteTodo'
import Loader from '../Utils/Loader'

class TodoList extends Component {
  
  deleteTodoHandler = (deleteTodo, id) => {
    deleteTodo({variables: {id}})
  }

  componentDidMount() {

  }

  render() {
    return (
      <Query query={GET_TODOS} fetchPolicy={'cache-and-network'}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
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