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

const errorHandler = (error) => {
  const errorMessage = error.message.split(':')[1]
  window.M.toast({html: errorMessage})
}

const Signup = (props) => {
  let email, password;
  return (
    <Mutation 
      mutation={LOGIN} 
      onCompleted={() => completed(props)}
      onError={(error) => errorHandler(error)}>
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
              <input ref={node => { email = node; }} name="email" placeholder="Emai e.g john@gmail.com" type="email" required/>
              <label>Email</label>
            </div>
            <div className="input-field">
              <input ref={node => { password = node; }} name="password" type="password" placeholder="Password" required/>
              <label>Password</label>
            </div>
            {!loading ? <button 
              className="waves-effect waves-light btn auth-button app-button" type="submit">
              Log in
            </button> : <Loader />
            }
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default Signup;