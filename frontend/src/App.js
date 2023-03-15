import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import UserHomePage from "./components/UserHomePage";
import ServerPage from "./components/ServerPage";
import ExplorePage from "./components/ExplorePage";
import ServerSidebar from "./components/ServerSidebar";
import { useSelector } from "react-redux";
function App() {
    
  return (
    <Switch>
      <Route path="/login" component={LoginFormPage}/>
      <Route path="/signup" component={SignupFormPage}/>
      <Route exact path="/servers/:serverId" component={ServerPage}/>
      <Route path="/servers/:serverId/:channelId" component={ServerPage}/>
      <Route path="/explore" component={ExplorePage}/>
      <Route path="/:username" component={UserHomePage}/>
      <Route exact path="/">
        <Redirect to="/login"/>
      </Route>
    </Switch>
  );
}

export default App;
