import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExercises,
  removeQuizQuestions,
} from "../../store/exercise/actions";
import { removeCompletedExercises } from "../../store/user/actions";
import { selectMethod } from "../../store/exercise/selectors";
import "./homepage.css";

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function Homepage() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectMethod);

  const [searchTerm, setSearchTerm] = useState();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(removeCompletedExercises());
    dispatch(removeQuizQuestions());
  }, []);

  useEffect(() => {
    if (exercises.length === 0) {
      dispatch(getExercises());
    }
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(exercises);
    } else {
      const results = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, exercises]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const data = !searchTerm ? exercises : searchResults;

  return (
    <div>
      <h3 className="hpTitle">Exercises</h3>
      <input
        className="searchBar"
        placeholder="Search method"
        value={searchTerm || ""}
        onChange={handleChange}
      />
      <br />

      {data.map((exercise) => {
        return (
          <Link className="hpLink" to={`/exercise/${exercise.id}`}>
            <Card className="hpCard" key={exercise.id}>
              <Card.Body className="homeCard">
                <b className="cardTitle">{exercise.name}</b>
                <br />
                Exercises: 3 <br />
                MonkeyMaster:
              </Card.Body>
            </Card>
          </Link>
        );
      })}
      <Card className="hpCard">
        <Card.Body className="homeCard">
          <b>Random</b>
          <br />
          Exercises: <br />
          MonkeyMaster:
        </Card.Body>
      </Card>
    </div>
  );
}
