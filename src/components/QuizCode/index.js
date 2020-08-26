import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExerciseById } from "../../store/exercise/actions";
import { updateCompletedExercise } from "../../store/user/actions";

import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";

export default function QuizCode(props) {
  const { exercise } = props;
  const { answer, question, exerciseId, id } = exercise;
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");

  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  console.log(`Hours: ${hours}, Minutes: ${minutes}, Seconds:${seconds}`);

  // ("send time to backend as 00:00:00");

  //this is something we should do in the parent component I think
  useEffect(() => {
    dispatch(getExerciseById(1));
  }, [dispatch]);

  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
  };

  function equal(a, b) {
    const condition2 = typeof a === "string" && typeof b === "string";
    if (condition2) return a === b;
  }

  function startExercise() {
    setStart(`${hours}:${minutes}:${seconds}`);
  }
  console.log("what is in start", start);

  function finishExercise() {
    const result = equal(answer, code);
    if (!result) {
      setMessage({
        backgroundColor: "red",
        text: "oeh-oeh-ahh-ahh monkey want banana? - This answer is incorrect!",
      });
    }
    if (result) {
      setMessage({
        backgroundColor: "green",
        text: "Long live the master! - This answer is correct!",
      });
      setFinish(`${hours}:${minutes}:${seconds}`);
    }
  }

  useEffect(() => {
    const splitStart = start.split(":");
    const splitFinish = finish.split(":");

    const hour = splitFinish[0] - splitStart[0];
    const minute = splitFinish[1] - splitStart[1];
    const second = splitFinish[2] - splitStart[2];

    const result = `${hour}:${minute}:${second}`;

    const experience = () => {
      if (
        (hour === 0 && minute <= 3 && second === 0) ||
        (hour === 0 && minute <= 2 && second < 60)
      ) {
        return 50;
      }
      if (minute > 6) {
        return 40;
      }
      if (minute > 9) {
        return 30;
      }
      if (minute > 12) {
        return 20;
      }
      if (minute > 15) {
        return 10;
      }
    };

    finish &&
      dispatch(updateCompletedExercise(exerciseId, id, result, experience()));
  }, [start, finish]);

  console.log("what is in start", start);
  console.log("what is in finish", finish);

  return (
    <div style={{ margin: "auto", width: "75%", backgroundColor: "grey" }}>
      {start && <h1>{question}</h1>}
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

      {!start ? (
        <button onClick={() => startExercise()}>Start</button>
      ) : (
        <button onClick={() => finishExercise()}>Finish</button>
      )}
    </div>
  );
}
