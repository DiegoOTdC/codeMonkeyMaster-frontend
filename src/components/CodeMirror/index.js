import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";

export default function CodeMirrorComponent() {
  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
  };

  const [code, setCode] = useState("");
  console.log(code);

  return (
    <div style={{ backgroundColor: "grey" }}>
      <CodeMirror
        value={code}
        options={{ mode: "javascript", ...codeMirrorOptions }}
        onBeforeChange={(editor, data, js) => {
          setCode(js);
        }}
      />
    </div>
  );
}
