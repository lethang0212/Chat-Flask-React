import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "../application/Login/Login-Form";
import RegisterForm from "../application/Login/Register-Form";
import HomePage from "../components/Page/Home-Page";

export default function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact strict path="/page" component={HomePage} />
        <Route exact strict path="/login" component={LoginForm} />
        <Route exact strict path="/register" component={RegisterForm} />
      </Switch>
    </Router>
  );
}
