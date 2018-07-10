import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import {UPDATE_TODO} from '../../mutations'

class EditTodo extends Component {
  
  updateTodoHandler = (updateTodo, id, text, completed) => {
    updateTodo(
      {
        variables: {id, text, completed: !completed},
        optimisticResponse: {
          __typename: "Mutation",
          updateTodo: {
            completed: !completed,
            id,
            text,
            __typename:"TodoType",
          }
        },
      }
    )

  }
  render() {
    const {id, text, completed} = this.props;
    return (
      <Mutation mutation={UPDATE_TODO}>
        {(updateTodo, {data, error}) => (
          <span>
            <input
            className="checkbox-orange" 
            type="checkbox" 
            name="completed"
            id={id}
            checked={completed} 
            onChange={() => this.updateTodoHandler(updateTodo, id, text, completed)}
            />
            <label htmlFor={id}>{text}</label>
          </span>
        )}
      </Mutation>
    )
  }
}

export default EditTodo;