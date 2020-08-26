import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExercises } from "../../store/exercise/actions";
import { selectMethod } from "../../store/exercise/selectors";
import "./homepage.css";

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { headShake } from "react-animations";
import styled, { keyframes } from "styled-components";

export default function Homepage() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectMethod);

  const [searchTerm, setSearchTerm] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const [isShown, setIsShown] = useState(false);
  const Bounce = styled.div`
    animation: 0.7s ${keyframes`${headShake}`};
  `;

  useEffect(() => {
    dispatch(getExercises());
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
  }, [searchTerm]);
  console.log("test", searchResults);
  console.log("search", searchTerm);
  console.log("exercises", exercises);

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
          <Bounce
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            <Card className="hpCard" key={exercise.id}>
              <Card.Body className="homeCard">
                <Link className="hpLink" to={`/exercise/${exercise.id}`}>
                  <b className="cardTitle">{exercise.name}</b>
                </Link>
                <br />
                Exercises: <br />
                MonkeyMaster:
              </Card.Body>
            </Card>
          </Bounce>
        );
      })}
      <Bounce
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <Card className="hpCard">
          <Card.Body className="homeCard">
            <b>Random</b>
            <br />
            Exercises: <br />
            MonkeyMaster:
          </Card.Body>
        </Card>
      </Bounce>
    </div>
  );
}
