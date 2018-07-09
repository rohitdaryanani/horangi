import gql from "graphql-tag";

export const ADD_TODO = gql`
mutation addTodo($text: String){
  addTodo(text: $text) {
    id,
    text,
    completed,
    completedAt
  }
}`

export const DELETE_TODO = gql`
mutation deleteTodo($id: String){
  deleteTodo(id: $id) {
    id
  }
}`

export const UPDATE_TODO = gql`
mutation updateTodo($id: String, $text: String, $completed: Boolean ){
  updateTodo(id: $id, text: $text, completed: $completed) {
    id,
    text,
    completed,
  }
}
`