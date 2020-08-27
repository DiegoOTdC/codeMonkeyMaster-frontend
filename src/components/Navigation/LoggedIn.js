import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOut } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import NavbarItem from "./NavbarItem";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

  return (
    <>
      <NavbarItem path="/homepage" linkText="Home" />
      <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.email}</Nav.Item>
      <button
        style={{
          backgroundColor: "#009973",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "16px",
          borderRadius: "8px",
        }}
        onClick={() => {
          dispatch(logOut());
          history.push("/");
        }}
      >
        Logout
      </button>
    </>
  );
}
