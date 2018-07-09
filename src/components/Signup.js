import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SIGNUP = gql`
  mutation signup($email: String!, $password: String!){
    signup(email: $email, password: $password) {
      id
    }
  }
`

const Signup = () => {
  let email, password;
  return (
    <Mutation mutation={SIGNUP}>
      {(signup, { data, error }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              signup({ variables: { email: email.value, password: password.value } });
              email.value = "";
              password.value = "";
            }}
          >
            <input
              ref={node => {
                email = node;
              }}
              name="email"
              required
            />
            <input
              ref={node => {
                password = node;
              }}
              name="password"
              required
            />
            <button type="submit">Sign Up!</button>
          </form>
          {error ? error.message : ''}
        </div>
      )}
    </Mutation>
  )
}

export default Signup;