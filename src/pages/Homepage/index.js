import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExercises } from "../../store/exercise/actions";
import { selectMethod } from "../../store/exercise/selectors";
import "./homepage.css";

import Card from "react-bootstrap/Card";

export default function Homepage() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectMethod);

  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  console.log("exercises", exercises);
  return (
    <div>
      <h3>Exercises</h3>
      {exercises.map((exercise) => {
        return (
          <Card className="hpCard">
            <Card.Body className="homeCard">
              <b>{exercise.name}</b>
              <p>Exercises:</p>
              <p>MonkeyMaster:</p>
            </Card.Body>
          </Card>
        );
      })}
      <Card className="hpCard">
        <Card.Body className="homeCard">Random</Card.Body>
      </Card>
      <Card className="hpCard">
        <Card.Body className="homeCard">Random</Card.Body>
      </Card>
    </div>
  );
}
