import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExercises } from "../../store/exercise/actions";
import { selectMethod } from "../../store/exercise/selectors";
import "./homepage.css";

import Card from "react-bootstrap/Card";

export default function Homepage() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectMethod);

  const [searchTerm, setSearchTerm] = useState();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  useEffect(() => {
    const results = exercises.filter((exercise) =>
      exercise.name.includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

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
        type="text"
        value={searchTerm}
        onChange={handleChange}
      />
      <br />

      {data.map((exercise) => {
        return (
          <Card className="hpCard">
            <Card.Body className="homeCard">
              <b className="cardTitle">{exercise.name}</b>
              <br />
              Exercises: <br />
              MonkeyMaster:
            </Card.Body>
          </Card>
        );
      })}
      <Card className="hpCard">
        <Card.Body className="homeCard">
          <b className="cardTitle">Random</b>
          <br />
          Exercises: <br />
          MonkeyMaster:
        </Card.Body>
      </Card>
    </div>
  );
}
