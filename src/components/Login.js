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
        <div className="auth-container">
          <form
            onSubmit={e => {
              e.preventDefault();
              login({ variables: { email: email.value, password: password.value } });
              email.value = "";
              password.value = "";
            }}
          >                  
            <div className="input-field">
              <input ref={node => { email = node; }} name="email" type="email" required/>
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input ref={node => { password = node; }} name="password" type="password" required/>
              <label className="validate" htmlFor="password">Password</label>
            </div>
            <button className="waves-effect waves-light btn auth-button" type="submit">Log in</button>
          </form>
          {error ? error.message : ''}
        </div>
      )}
    </Mutation>
  )
}

export default Signup;