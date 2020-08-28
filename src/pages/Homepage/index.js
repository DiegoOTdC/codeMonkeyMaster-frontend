import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExercises,
  removeQuizQuestions,
} from "../../store/exercise/actions";
import { removeCompletedExercises } from "../../store/user/actions";
import { selectMethod } from "../../store/exercise/selectors";
import { selectUser } from "../../store/user/selectors"
import "./homepage.css";
import Progressbar from "../../components/Progressbar"

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function Homepage() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectMethod);
  const user = useSelector(selectUser)
  const [searchTerm, setSearchTerm] = useState();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(removeCompletedExercises());
    dispatch(removeQuizQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (exercises.length === 0) {
      dispatch(getExercises());
    }
  }, [dispatch, exercises.length]);

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
      <Progressbar userData={user} /> 
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
          <Link
            className="hpLink"
            key={exercise.id}
            to={`/exercise/${exercise.id}`}
          >
            <Card className="hpCard">
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
      <Link
        className="hpLink"
        to="/exercise/random">
      <Card className="hpCard">
        <Card.Body className="homeCard">
          <b>Random</b>
          <br />
          Exercises: <br />
          MonkeyMaster:
        </Card.Body>
      </Card>
      </Link>
    </div>
  );
}
