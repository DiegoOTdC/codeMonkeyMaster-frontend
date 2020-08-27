import React from "react";
import "./hint.css";
import Card from "react-bootstrap/Card";

export default function hint(props) {
  return (
    <div>
      <Card className="hintCard">
        <Card.Body className="hintBody">
          <span role="img" aria-label="lightbulb">
            💡
          </span>
          <b>Hint: </b> {props.hint}
          Here comes the hint fetched from the backend later
        </Card.Body>
      </Card>
    </div>
  );
}
