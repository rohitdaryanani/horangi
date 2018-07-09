import gql from "graphql-tag";

export const GET_TODOS = gql`
query todos {
  todos {
    id
    text
    completed
  }
}
`


