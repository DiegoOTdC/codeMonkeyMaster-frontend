import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { updateCompletedExercise } from "../../store/user/actions";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";
// import Progressbar from "../Progressbar";

export default function QuizCode(props) {
  const { exercise } = props;
  const { answer, question, exerciseId, id } = exercise;
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");

  const [review, set_Review] = useState("");
  const userNeeded = useSelector(selectUser);

  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

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

    const startTimeInSeconds =
      parseInt(splitStart[0]) * 3600 +
      parseInt(splitStart[1]) * 60 +
      parseInt(splitStart[2]);
    const finishTimeInSeconds =
      parseInt(splitFinish[0]) * 3600 +
      parseInt(splitFinish[1]) * 60 +
      parseInt(splitFinish[2]);

    const result = finishTimeInSeconds - startTimeInSeconds;
    const seconds = result % 60;
    const allMinutes = result / 60;

    const finalTime = () => {
      if (allMinutes < 60) {
        const minutes = allMinutes;
        const hour = 0;
        return `${hour}:${Math.floor(minutes)}:${seconds}`;
      } else {
        const hour = allMinutes / 60;
        const minutes = allMinutes % 60;
        return `${Math.floor(hour)}:${Math.floor(minutes)}:${seconds}`;
      }
    };

    const time = finalTime();
    const splitTime = time.split(":");

    const experience = () => {
      const hour = parseInt(splitTime[0]);
      const minute = parseInt(splitTime[1]);
      const second = parseInt(splitTime[2]);

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

    console.log("we get here?");

    finish &&
      dispatch(
        updateCompletedExercise(exerciseId, id, finalTime(), experience())
      );
  }, [dispatch, exerciseId, id, start, finish]);

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

  function correctOrNot() {
    if (review === "") {
      return "info";
    } else if (review === "incorrect") {
      return "danger";
    } else if (review === "correct") {
      return "success";
    } else {
      return "warning";
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card
            bg={correctOrNot()}
            style={{
              width: "60rem",
              height: "30rem",
            }}
          >
            <Card.Body>
              {" "}
              <Card.Title>
                {/* <Progressbar userData={userNeeded} /> */}
                Level 1: Quiz Questions
              </Card.Title>
              <Card.Text>
                <span
                  style={{
                    fontSize: 30,
                  }}
                >
                  {question}
                </span>
              </Card.Text>
              <CodeMirror
                value={code}
                options={{ mode: "javascript", ...codeMirrorOptions }}
                onBeforeChange={(editor, data, js) => {
                  setCode(js);
                }}
              />{" "}
              <Button
                variant="outline-warning"
                onClick={() => {
                  startExercise();
                }}
              >
                <span role="img" aria-label="banana">
                  🍌
                </span>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
