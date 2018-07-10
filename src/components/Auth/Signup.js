import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
    }
  }
`;

const completed = props => {
  props.history.push('/');
};

const errorHandler = error => {
  const errorMessage = error.message.split(':')[1];
  window.M.toast({ html: errorMessage });
};

const Signup = (props) => {
  let email, password;
  return (
    <Mutation
      mutation={SIGNUP}
      onCompleted={() => completed(props)}
      onError={error => errorHandler(error)}
    >
      {(signup, { loading }) => (
        <div className="auth-container">
          <AuthForm
            completed={completed}
            submitName="SIGN UP"
            loading={loading}
            action={signup}
          />
          <p className="center-align">
            Already have an account? <Link className="link-label" to="/login">Log in</Link>
          </p>
        </div>
      )}
    </Mutation>
  );
};

export default Signup;
