import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { useHistory } from "react-router";
import { updateCompletedExercise } from "../../store/user/actions";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";
import Progressbar from "../Progressbar";

import "./index.css";

import Timer from "../Timer";

export default function QuizCode(props) {
  const history = useHistory();
  const user = useSelector(selectUser);
  const { exercise } = props;
  const { answer, question, exerciseId, id } = exercise;
  console.log("question", question);
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  const [timer, setTimer] = useState(false);

  const [review, set_Review] = useState("");

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
    setTimer(true);
  }

  function finishExercise() {
    const result = equal(answer, code);
    if (!result) {
      set_Review("incorrect");
      setTimeout(() => {
        set_Review("");
      }, 1500);
    }
    if (result) {
      set_Review("correct");
      setTimer(false);
      setFinish(`${hours}:${minutes}:${seconds}`);
      console.log("time", finish);
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

    finish &&
      dispatch(
        updateCompletedExercise(exerciseId, id, finalTime(), experience())
      );
    finish && history.push("/homepage");
  }, [dispatch, exerciseId, id, start, finish, history]);

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
            }}
          >
            <Card.Body>
              {" "}
              <Card.Title>
                <Row>
                  <div style={{ display: "inline-block" }}>
                    <Progressbar userData={user} />
                  </div>
                  {start ? (
                    <div
                      style={{
                        display: "inline-block",
                        marginLeft: "auto",
                        marginRight: "5%",
                        marginTop: "1em",
                      }}
                    >
                      <Timer timer={timer} finish={finish} />
                    </div>
                  ) : null}
                </Row>
                Level 2: Quiz Code
              </Card.Title>
              <Card.Text>
                <span
                  style={{
                    fontSize: 30,
                  }}
                >
                  {start && question}
                </span>
              </Card.Text>
              <br />
              <div className="TopCodeMirror">
                <CodeMirror
                  value={
                    code || start
                      ? code
                      : `console.log("Please press the hourglass to start the exercise! => Remember!! It's on time!")`
                  }
                  options={{ mode: "javascript", ...codeMirrorOptions }}
                  onBeforeChange={(editor, data, js) => {
                    setCode(js);
                  }}
                />
              </div>
              <br />
              {!start ? (
                <Button
                  variant="outline-warning"
                  onClick={() => {
                    startExercise();
                  }}
                >
                  <span role="img" aria-label="hourglass">
                    &#8987;
                  </span>
                </Button>
              ) : (
                <Button
                  variant="outline-warning"
                  onClick={() => {
                    finishExercise();
                  }}
                >
                  <span role="img" aria-label="hourglass">
                    &#9203;
                  </span>
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}
