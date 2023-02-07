import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import '../LoginFormPage/LoginFormPage.css'

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to={`/${sessionUser.username}`} />;

  const handleSubmit = (e) => {
    e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
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
  return (
    <div className='login' id="form">
    <h1 className='login' >Create an account</h1>
    <form className='login'  onSubmit={handleSubmit}>
      <label className='login' >
        EMAIL <span className='login' >{errors.map(error => <span key={error}>{error}</span>)}</span>
        <br/>
        <br/>
        <input className='login' 
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br/>
      <label className='login' >
        USERNAME
        <br/>
        <br/>
        <input className='login' 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <br/>
      <label className='login' >
        PASSWORD
        <br/>
        <br/>
        <input className='login' 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br/>
      <button className='login'  type="submit">Sign Up</button>
    </form>
    <p className="redirect"><a href="/login">Already have an account?</a></p>
    </div>
  );
}

export default SignupFormPage;