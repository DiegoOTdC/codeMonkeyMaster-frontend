//import React, { useState } from "react";
import React from "react";
import "./hint.css";
import Card from "react-bootstrap/Card";

// import { zoomIn } from "react-animations";
// import styled, { keyframes } from "styled-components";

export default function hint(props) {
  // const [isShown, setIsShown] = useState(false);
  // const Bounce = styled.div`
  //   animation: 0.7s ${keyframes`${zoomIn}`};
  // `;

  return (
    <div>
      {/* <Bounce
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      > */}
      <Card className="hintCard">
        <Card.Body className="hintBody">
          <span role="img" aria-label="lightbulb">
            💡
          </span>
          <b>Hint: </b> {props.hint}
          Here comes the hint fetched from the backend later
        </Card.Body>
      </Card>
      {/* </Bounce> */}
    </div>
  );
}
