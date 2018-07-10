import React from 'react';
import Loader from '../Utils/Loader'

const AuthForm = props => {
  const {loading, submitName, action} = props
  let email, password;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        action({ variables: { email: email.value, password: password.value } });
        email.value = '';
        password.value = '';
      }}
    >
      <div className="input-field">
        <input
          autoFocus
          ref={node => {
            email = node;
          }}
          name="email"
          placeholder="Emai e.g john@gmail.com"
          type="email"
          required
        />
        <label>Email</label>
      </div>
      <div className="input-field">
        <input
          ref={node => {
            password = node;
          }}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <label>Password</label>
      </div>
      {!loading ? (
        <button
          className="waves-effect waves-light btn auth-button app-button"
          type="submit"
        >
          {submitName}
        </button>
      ) : (
        <Loader />
      )}
    </form>
  );
};

export default AuthForm;
