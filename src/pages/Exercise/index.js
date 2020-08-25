import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExerciseById } from "../../store/exercise/actions";
import { selectExercise } from "../../store/exercise/selectors";
import { selectCompletedExercises } from "../../store/user/selectors";
import { getCompletedExercises } from "../../store/user/actions";
import MultipleChoice from "../../components/MultipleChoice";

export default function Exercise() {
  const param = useParams();
  const exerciseId = param.id;
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  console.log("what is in exercise?", exercise);

  const completedExercises = useSelector(selectCompletedExercises);
  console.log("completed", completedExercises);

  const exercises_lvl1 = exercise.filter((item) => {
    if (item.level === "level 1") {
      return true;
    } else {
      return false;
    }
  });
  const exercises_lvl2 = exercise.filter((item) => {
    if (item.level === "level 2") {
      return true;
    } else {
      return false;
    }
  });

  console.log("what is in lvl1?", exercises_lvl1);
  console.log("what is in lvl2?", exercises_lvl2);

  useEffect(() => {
    dispatch(getCompletedExercises());
    dispatch(getExerciseById(exerciseId));
  }, [dispatch, exerciseId]);

  //when should you pass to multiple choice ? when you haven't finished those exercises yet.
  //how do we know?

  return (
    <div>
      I am a quiz page! :D
      <MultipleChoice exercises={exercises_lvl1} />
    </div>
  );
}
