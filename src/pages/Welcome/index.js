import React from "react";
import { Link } from "react-router-dom";
import gif from "../../images/CodeMonkeyMaster.gif";
import "./welcome.css";

export default function Welcome() {
  return (
    <>
      <div className="welcomeHeader">
        <img className="welcomeGif" src={gif} alt="Logo" />
      </div>
      <div className="welcomeText">
        <h4>Welcome to CodeMonkeyMaster!</h4>
        <p>
          Here you will learn everything you need to know about{" "}
          <i>array methods</i>. <br />
          You will start as a code monkey but if you complete all the exercises
          you can become the ultimate code master!
        </p>
        <p>
          <br />
          <b>
            <Link to="/signup">
              <button className="welcomeButton">Sign up</button>
            </Link>{" "}
            for free and start your code challenge now!
          </b>
        </p>
      </div>
    </>
  );
}
