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
  const [message, setMessage] = useState("");

  //this is something we should do in the parent component I think
  useEffect(() => {
    dispatch(getExerciseById(1));
  }, []);

  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
  };

  function submitAnswer() {
    const result = equal(correctAnswer, code);
    if (!result) {
      setMessage({
        backgroundColor: "red",
        text: "oeh-oeh-ahh-ahh monkey want banana? - This answer is incorrect!",
      });
    }
    if (result) {
      setMessage({
        backgroundColor: "green",
        text: "Long live the king! - This answer is correct!",
      });
    }
  }

  return (
    <div style={{ backgroundColor: "grey" }}>
      <CodeMirror
        value={code}
        options={{ mode: "javascript", ...codeMirrorOptions }}
        onBeforeChange={(editor, data, js) => {
          setCode(js);
        }}
      />

      {message && (
        <p
          style={{ backgroundColor: message.backgroundColor, color: "yellow" }}
        >
          {message.text}
        </p>
      )}

      <button onClick={() => submitAnswer()}>Submit</button>
    </div>
  );
}
