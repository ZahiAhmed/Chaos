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

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
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
    <h1>Create an account</h1>
    <form onSubmit={handleSubmit}>
      <label>
        EMAIL <span>{errors.map(error => <span key={error}>{error}</span>)}</span>
        <br/>
        <br/>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br/>
      <label>
        USERNAME
        <br/>
        <br/>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <br/>
      <label>
        PASSWORD
        <br/>
        <br/>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br/>
      <button type="submit">Sign Up</button>
    </form>
    <p className="redirect"><a href="/login">Already have an account?</a></p>
    </div>
  );
}

export default SignupFormPage;