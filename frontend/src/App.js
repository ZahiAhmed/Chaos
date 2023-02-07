import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import UserHomePage from "./components/UserHomePage";

function App() {
  
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route path="/:username">
        <UserHomePage/>
      </Route>
      <Route exact path="/">
        <Redirect to="/login"/>
        <LoginFormPage/>
      </Route>
    </Switch>
  );
}

export default App;
