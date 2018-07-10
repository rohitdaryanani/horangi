import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import {GET_TODOS} from '../../queries'
import {DELETE_TODO} from '../../mutations'

class DeleteTodo extends Component {
  
  deleteTodoHandler = (deleteTodo, id) => {
    deleteTodo({variables: {id}})
  }

  render() {
    const {id, completed} = this.props;
    return (
      <Mutation mutation={DELETE_TODO} refetchQueries={[{query: GET_TODOS}]}>
        {(deleteTodo, {data, error}) => (
          completed && <button 
            className="todo-delete"
            onClick={() => this.deleteTodoHandler(deleteTodo, id)}>
            Delete
          </button>
        )}
      </Mutation>
    )
  }
}

export default DeleteTodo;