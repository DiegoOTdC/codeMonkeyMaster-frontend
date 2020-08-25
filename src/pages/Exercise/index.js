import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExerciseById } from "../../store/exercise/actions";
import { selectExercise } from "../../store/exercise/selectors";

export default function Exercise() {
  const param = useParams();
  const exerciseId = param.id;
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  console.log("what is in here?", exercise);

  useEffect(() => {
    dispatch(getExerciseById(exerciseId));
  }, []);

  return <div>I am a quiz page! :D</div>;
}
