import React from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm'


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

const Login = (props) => {
  return (
    <Mutation 
      mutation={LOGIN} 
      onCompleted={() => completed(props)}
      onError={(error) => errorHandler(error)}>
      {(login, { loading }) => (
        <div className="auth-container">
          <AuthForm completed={completed} submitName="Log in" loading={loading} action={login}/>
          <p className="center-align">Not a member? <Link className="link-label" to="/signup">Sign up</Link></p>
        </div>
      )}
    </Mutation>
  )
}

export default Login;