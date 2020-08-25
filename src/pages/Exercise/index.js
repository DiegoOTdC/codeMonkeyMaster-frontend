import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExerciseById } from "../../store/exercise/actions";
import { selectExercise } from "../../store/exercise/selectors";
import MultipleChoice from "../../components/MultipleChoice";

export default function Exercise() {
  const param = useParams();
  const exerciseId = param.id;
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  console.log("what is in exercise?", exercise);

  const exercises_lvl1 = exercise.filter((item) => {
    if (item.level === "level 1") return true;
  });
  const exercises_lvl2 = exercise.filter((item) => {
    if (item.level === "level 2") return true;
  });

  console.log("what is in lvl1?", exercises_lvl1);
  console.log("what is in lvl2?", exercises_lvl2);

  useEffect(() => {
    dispatch(getExerciseById(exerciseId));
  }, []);

  return (
    <div>
      I am a quiz page! :D
      <MultipleChoice exercises={exercises_lvl1} />
    </div>
  );
}
