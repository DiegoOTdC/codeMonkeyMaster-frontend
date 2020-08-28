import React from "react";
import "./hint.css";

export default function hint({ hint }) {
  return (
    <div className="hint">
      <span role="img" aria-label="lightbulb">
        💡
      </span>
      <b>Hint: </b>
      {hint}
    </div>
  );
}
