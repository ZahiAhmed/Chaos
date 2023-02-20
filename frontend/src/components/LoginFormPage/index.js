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

  if (sessionUser) return <Redirect to={`/${sessionUser.username}`}/>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (response) => {
        let data;
        try {
          data = await response.clone().json();
        } catch {
          data = await response.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([response.statusText]);
      });
  }

  const loginDemo = (e) => {
    e.preventDefault()
    dispatch(sessionActions.login({credential: 'zaus', password: 'zausbaus'}))
  }

  return (
    <div className='login' id="form" >
    <h1 className='login'>Welcome back!</h1>
    <p className='login'>We're so excited to see you again!</p>
    <form className='login' onSubmit={handleSubmit}>
      <label className='login'>
        USERNAME OR EMAIL <span className='login'>{errors.map(error => <span key={error}>{error}</span>)}</span>
        <br/>
        <br/>
        <input className='login'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
      </label>
      <br/>
      <label className='login'>
        PASSWORD <span className='login'>{errors.map(error => <span key={error}>{error}</span>)}</span>
        <br/>
        <br/>
        <input className='login'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <p id="forgotpassword" className="redirect"><a href="/login">Forgot Password?</a></p> */}
      </label>
      <br/>
      <button type="submit" className='login'>Log In</button>
    </form >
    <br/>
    <br/>
      <button onClick={loginDemo} className='login'>Demo Login</button>
    <p className='redirect'>Need an account? <a href="/signup">Register</a></p>
    </div>
  );
}

export default LoginFormPage;