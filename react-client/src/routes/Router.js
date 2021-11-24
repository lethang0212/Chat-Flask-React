import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginForm from "../application/Login/Login-Form";
import RegisterForm from "../application/Login/Register-Form";
import { ChatRoom } from "../components/Messenger/ChatRoom/ChatRoom";

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (authed ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

export default function Routing() {
  const data = useSelector((state) => state.User);
  const accessToken = !!data.token;
  console.log(accessToken);

  return (
    <Router>
      <Switch>
        <Route exact strict path="/login" component={LoginForm} />
        <Route exact strict path="/register" component={RegisterForm} />
        <Route
          // authed={accessToken}
          exact
          strict
          path="/"
          component={ChatRoom}
        />
      </Switch>
    </Router>
  );
}
