import React, { useState } from "react";
import { dispatch, useSelector } from "react-redux";
import { selectCorrectAnswer } from "../../store/exercise/selectors";
import { getExerciseById } from "../../store/exercise/actions";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";

import { equal } from "./equal";

export default function CodeMirrorComponent() {
  const dipatch = useDispatch();
  const correctAnswer = useSelector(selectCorrectAnswer);
  const [code, setCode] = useState("");

  useEffect(() => {
    dispatch(getExerciseById(1));
  }, []);

  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
  };

  console.log(code);

  const whatisthis = equal(correctAnswer, code);
  console.log("is it returning this", whatisthis);

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
