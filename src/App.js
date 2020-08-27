import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Homepage from "./pages/Homepage";
import Exercise from "./pages/Exercise";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  const protectedRoutes = (Component, routerProps) => {
    const isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? (
      <Component {...routerProps} />
    ) : (
      <Redirect to="/login" />
    );
  };

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route
          path="/homepage"
          render={(routerProps) => protectedRoutes(Homepage, routerProps)}
        />
        <Route
          path="/exercise/:id"
          render={(routerProps) => protectedRoutes(Exercise, routerProps)}
        />
      </Switch>
    </div>
  );
}

export default App;
