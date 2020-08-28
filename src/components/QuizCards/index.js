import React, { useState } from "react";
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
import { useParams, useHistory } from "react-router";
import Popup from "reactjs-popup";
import { selectUser } from "../../store/user/selectors";
import { selectExercise } from "../../store/exercise/selectors";
import { sendCompletedQuiz } from "../../store/user/actions";
import Progressbar from "../Progressbar";
import Hint from "../Hint";
import hint from "../Hint";

export default function QuizCards(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [answered, set_Answered] = useState(0);
  const [review, set_Review] = useState("");
  const [color, set_Color] = useState("");
  const [shuffle, set_Shuffle] = useState(Math.floor(Math.random() * 10 + 1));
  const quizQuestions = props.exercise;
  const params = useParams();
  const exerciseIdNeeded = parseInt(params.id);
  const userNeeded = useSelector(selectUser);
  const exercises = useSelector(selectExercise);

  if (quizQuestions === undefined) {
    return <Spinner animation="border" variant="warning" />;
  }

  console.log("exer", exercises);
  const hint = exercises.map((exer) => {
    return exer.hint;
  });

  const PopupHint = () => (
    <Popup
      trigger={
        <Button variant="outline-warning">
          <span role="img" aria-label="hint">
            💡
          </span>{" "}
          Hint
        </Button>
      }
      position="right center"
    >
      <Hint hint={hint} />
    </Popup>
  );

  function correctOrNot() {
    if (color === "") {
      return "info";
    } else if (color === "incorrect") {
      return "danger";
    } else if (color === "correct") {
      return "success";
    } else {
      return "warning";
    }
  }

  function randomAnswers(randomNum) {
    if (randomNum <= 2.5) {
      return (
        <Form>
          <Form.Group controlId="ControlSelect">
            <Form.Label>Possible Solutions:</Form.Label>
            <Form.Control as="select" multiple>
              <option
                value="correct"
                onClick={(event) => set_Review(event.target.value)}
              >
                1) {quizQuestions.answer}
              </option>
              <option
                value="incorrect"
                onClick={(event) => set_Review(event.target.value)}
              >
                2) {quizQuestions.incorrect1}
              </option>
              <option
                value="incorrect"
                onClick={(event) => set_Review(event.target.value)}
              >
                3) {quizQuestions.incorrect2}
              </option>
              <option
                value="incorrect"
                onClick={(event) => set_Review(event.target.value)}
              >
                4) {quizQuestions.incorrect3}
              </option>
            </Form.Control>
          </Form.Group>
        </Form>
      );
    } else if (2.5 <= randomNum && randomNum <= 5) {
      return (
        <Form>
          <Form.Group controlId="ControlSelect">
            <Form.Label>Possible Solutions:</Form.Label>
            <Form.Control as="select" multiple>
              <option
                value="incorrect"
                onClick={(event) => set_Review(event.target.value)}
              >
                1) {quizQuestions.incorrect1}
              </option>
              <option
                value="correct"
                onClick={(event) => set_Review(event.target.value)}
              >
                2) {quizQuestions.answer}
              </option>
              <option
                value="incorrect"
                onClick={(event) => set_Review(event.target.value)}
              >
                3) {quizQuestions.incorrect2}
              </option>
              <option
                value="incorrect"
                onClick={(event) => set_Review(event.target.value)}
              >
                4) {quizQuestions.incorrect3}
              </option>
            </Form.Control>
          </Form.Group>
        </Form>
      );
    } else if (5 <= randomNum && randomNum <= 7.5) {
      return (
        <Form>
          <Form.Group controlId="ControlSelect">
            <Form.Label>Possible Solutions:</Form.Label>
            <Form.Control as="select" multiple>
              <option
                value="incorrect"
                onClick={(event) => set_Review(event.target.value)}
              >
                1) {quizQuestions.incorrect1}
              </option>
              <option
                value="incorrect"
                onClick={(event) => set_Review(event.target.value)}
              >
                2) {quizQuestions.incorrect2}
              </option>
              <option
                value="correct"
                onClick={(event) => set_Review(event.target.value)}
              >
                3) {quizQuestions.answer}
              </option>
              <option
                value="incorrect"
                onClick={(event) => set_Review(event.target.value)}
              >
                4) {quizQuestions.incorrect3}
              </option>
            </Form.Control>
          </Form.Group>
        </Form>
      );
    } else {
      return (
        <Form>
          <Form.Group controlId="ControlSelect">
            <Form.Label>Possible Solutions:</Form.Label>
            <Form.Control as="select" multiple>
              <option
                value="incorrect"
                onClick={(event) => set_Review(event.target.value)}
              >
                1) {quizQuestions.incorrect1}
              </option>
              <option
                value="incorrect"
                onClick={(event) => set_Review(event.target.value)}
              >
                2) {quizQuestions.incorrect2}
              </option>
              <option
                value="incorrect"
                onClick={(event) => set_Review(event.target.value)}
              >
                3) {quizQuestions.incorrect3}
              </option>
              <option
                value="correct"
                onClick={(event) => set_Review(event.target.value)}
              >
                4) {quizQuestions.answer}
              </option>
            </Form.Control>
          </Form.Group>
        </Form>
      );
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
              <Card.Title>
                <Progressbar userData={userNeeded} />
                Level 1: Quiz Questions
              </Card.Title>
              <Card.Text>
                <span
                  style={{
                    fontSize: 30,
                  }}
                >
                  {quizQuestions.question}
                </span>
              </Card.Text>
              {randomAnswers(shuffle)}
              <Button
                variant="outline-warning"
                onClick={() => set_Color(review)}
              >
                <span role="img" aria-label="banana">
                  🍌
                </span>{" "}
                Check answer
              </Button>

              <PopupHint />
              <br />
              <Button
                variant="outline-warning"
                onClick={() => {
                  dispatch(
                    sendCompletedQuiz(exerciseIdNeeded, quizQuestions.id)
                  );
                  set_Review("");
                  set_Shuffle(Math.floor(Math.random() * 10) + 1);
                  set_Answered(answered + 1);
                }}
              >
                {" "}
                <span role="img" aria-label="banana">
                  🍌
                </span>
                Next question
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
