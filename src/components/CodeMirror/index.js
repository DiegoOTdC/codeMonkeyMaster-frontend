import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript.js";

import React from "react";

const editor = CodeMirror(document.getElementById("codeeditor"));

export default function CodeMirror() {
  return (
    <div style={{ backgroudnColor: "#EEE" }}>
      <div id="codeeditor"></div>
    </div>
  );
}
