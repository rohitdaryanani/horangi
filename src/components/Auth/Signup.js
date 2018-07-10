import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import { SIGNUP } from '../../mutations';

const completed = props => {
  props.history.push('/');
};

const errorHandler = error => {
  const errorMessage = error.message.split(':')[1];
  window.M.toast({ html: errorMessage });
};

const Signup = (props) => {
  const token = localStorage.getItem('token');
  if (token) {
    props.history.push('/');
  }
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
