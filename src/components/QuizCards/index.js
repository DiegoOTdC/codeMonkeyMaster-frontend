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

import { selectUser } from "../../store/user/selectors";
import { sendCompletedQuiz } from "../../store/user/actions";
import Progressbar from "../Progressbar";


export default function QuizCards(props){
    const history = useHistory()
    const dispatch = useDispatch()
    const [answered, set_Answered] = useState(0)
    const [review, set_Review] = useState("")
    // console.log("review test", review)
    const [shuffle, set_Shuffle] = useState(Math.floor((Math.random()*10) + 1))
    console.log("shuffle test", shuffle)
    const quizQuestions = props.exercise
    // console.log("quiz question check", quizQuestions)
    const exerciseIdNeeded = quizQuestions.id
    console.log("exercise Id test", exerciseIdNeeded)
    const userNeeded = useSelector(selectUser)
    console.log("here is the user", userNeeded)

  if (quizQuestions === undefined) {
    return <Spinner animation="border" variant="warning" />;
  }

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
                onClick={() => {
                  dispatch(
                    sendCompletedQuiz(exerciseIdNeeded, quizQuestions.id)
                  );
                  set_Review("");
                  set_Shuffle(Math.floor(Math.random() * 10) + 1);
                  set_Answered(answered + 1);
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
