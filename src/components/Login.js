import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Loader from './Loader'


const LOGIN = gql`
  mutation signup($email: String!, $password: String!){
    login(email: $email, password: $password) {
      id
    }
  }
`

const completed = (props) => {
  props.history.push('/');
}

const Signup = (props) => {
  let email, password;
  return (
    <Mutation mutation={LOGIN} onCompleted={() => completed(props)}>
      {(login, { loading, data, error }) => (
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
              <label htmlFor="email" className="active">Email</label>
            </div>
            <div className="input-field">
              <input ref={node => { password = node; }} name="password" type="password" required/>
              <label className="active" htmlFor="password">Password</label>
            </div>
            {!loading ? <button 
              className="waves-effect waves-light btn auth-button" type="submit" disabled={loading}>
              Log in
            </button> : <Loader />
            }
          </form>
          {error ? error.message : ''}
        </div>
      )}
    </Mutation>
  )
}

export default Signup;