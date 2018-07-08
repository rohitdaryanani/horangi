import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const LOGIN = gql`
  mutation signup($email: String!, $password: String!){
    login(email: $email, password: $password) {
      id
    }
  }
`

const Signup = () => {
  let email, password;
  return (
    <Mutation mutation={LOGIN}>
      {(login, { data, error }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              login({ variables: { email: email.value, password: password.value } });
              email.value = "";
              password.value = "";
            }}
          >
            <input
              ref={node => {
                email = node;
              }}
              name="email"
            />
            <input
              ref={node => {
                password = node;
              }}
              name="password"
            />
            <button type="submit">Login!</button>
          </form>
          {error ? error.message : ''}
        </div>
      )}
    </Mutation>
  )
}

export default Signup;