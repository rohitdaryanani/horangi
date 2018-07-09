import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import {UPDATE_TODO} from '../mutations'

class EditTodo extends Component {
  
  updateTodoHandler = (updateTodo, id, text, completed) => {
    updateTodo({variables: {id, text, completed: !completed}})

  }
  render() {
    const {id, text, completed} = this.props;
    return (
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
    )
  }
}

export default EditTodo;