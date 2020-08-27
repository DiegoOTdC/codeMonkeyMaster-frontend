import React from "react";
import { Redirect } from "react-router-dom";

export default function protectedRoute({ component }) {
  const Component = component;
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Component /> : <Redirect to={{ pathname: "/" }} />;
}
