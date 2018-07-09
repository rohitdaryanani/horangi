import React, {Component} from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_TODOS = gql`
{
  todos {
    id
    text
    completed
    completedAt
  }
}
`

const ADD_TODO = gql`
mutation addTodo($text: String){
  addTodo(text: $text) {
    id,
    text,
    completed,
    completedAt
  }
}`

class Todo extends Component {
  state = {
    todoText: ''
  }

  submitTodo = (event, addTodo) => {
    const {todoText} = this.state;
    event.preventDefault();
    addTodo({variables: {text: todoText}})
    this.setState({
      todoText: '',
    })
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
            <form onSubmit={(event) => this.submitTodo(event, addTodo)}>
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
            {data.todos.map(todo => (
              <li key={todo.id}>{todo.text}</li>
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