import React, { useEffect, useState } from "react";
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
  // we need to check if level 1->exercise 1's id  is in this completedExercise.. is it NOT in there?
  //then render multiplechoice component and pass this exercise as prop
  // Is it in there? try level 1-> exercise 2, then 3, 4 , 5 etc.
  // level 1 are all finished, go to level 2 -> exercise 1.. if that is NOT in there ?
  // then render the CodeMirror component passing in the correct code

  //completedExercises = [{},{},{}] with at least exerciseId: as key

  //this SHOULD match the exerciseId in completedExercises against the

  // const [currentExercise, setCurrentExercise] = useState("");

  // if (completedExercises) {
  //   for (let i = 0; i < completedExercises.length; i++) {
  //     const correctExercise = exercise.filter((item) => {
  //       if (completedExercises.exerciseId === item.id) {
  //         return true;
  //       } else {
  //         console.log("here");
  //         return false;
  //       }
  //     });
  //     setCurrentExercise(correctExercise);
  //   }
  // }

  // console.log("what is the current exercise?", currentExercise);

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
