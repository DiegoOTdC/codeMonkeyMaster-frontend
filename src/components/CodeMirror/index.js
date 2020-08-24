import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCorrectAnswer } from "../../store/exercise/selectors";
import { getExerciseById } from "../../store/exercise/actions";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";

import { equal } from "./equal";

export default function CodeMirrorComponent() {
  const dispatch = useDispatch();
  const correctAnswer = useSelector(selectCorrectAnswer);
  const [code, setCode] = useState("");

  console.log("what is correctAnswer", correctAnswer);
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
