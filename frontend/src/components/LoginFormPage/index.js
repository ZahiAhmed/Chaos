import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginFormPage.css';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  return (
    <div className="form">
    <h1>Welcome back!</h1>
    <p>We're so excited to see you again!</p>
    <form onSubmit={handleSubmit}>
      <label>
        USERNAME OR EMAIL <span>{errors.map(error => <span key={error}>{error}</span>)}</span>
        <br/>
        <br/>
        <input 
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <br/>
      <label>
        PASSWORD <span>{errors.map(error => <span key={error}>{error}</span>)}</span>
        <br/>
        <br/>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p id="forgotpassword" className="redirect"><a href="/login">Forgot Password?</a></p>
      </label>
      <br/>
      <button type="submit">Log In</button>
    </form>
    <p className='redirect'>Need an account? <a href="/signup">Register</a></p>
    </div>
  );
}

export default LoginFormPage;