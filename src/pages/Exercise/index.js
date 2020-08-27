import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExerciseById } from "../../store/exercise/actions";
import { selectExercise } from "../../store/exercise/selectors";
import { selectCompletedExercises } from "../../store/user/selectors";
import { getCompletedExercises } from "../../store/user/actions";
import QuizCards from "../../components/QuizCards";
import QuizCode from "../../components/QuizCode";

export default function Exercise() {
  const param = useParams();
  console.log("param", param);
  const exerciseId = param.id;
  console.log("ex id test", exerciseId);
  const dispatch = useDispatch();
  const allCurrentExercises = useSelector(selectExercise);
  const completedExercises = useSelector(selectCompletedExercises);
  const [currentExercise, setCurrentExercise] = useState("");
  const [finish, setFinish] = useState(false);
  console.log("all ex", allCurrentExercises);
  console.log("completedExercise", completedExercises);

  useEffect(() => {
    //check if any of the exercises are completed by user, add to new array "commonElements"
    function getCommon(arr1, arr2) {
      let common = [];
      console.log("do we get here?", arr1);
      console.log("what about here?", arr2);
      for (let i = 0; i < arr1.length; ++i) {
        for (let j = 0; j < arr2.length; ++j) {
          if (arr1[i].id === arr2[j].quizQuestionId) {
            common.push(arr1[i]);
          }
        }
      }
      return common;
    }
    const commonElements = getCommon(allCurrentExercises, completedExercises);
    console.log("the common", commonElements);
    console.log("the completedexxercises", completedExercises);

    //Create a new array that has all exercises the user has not done yet (allCurrentExercises - commonElements) = leftOverExercises
    const leftOverExercises = allCurrentExercises.filter((el) => {
      return !commonElements.includes(el);
    });
    console.log("leftOverExercises", leftOverExercises);

    if (leftOverExercises.length !== 0) {
      console.log(
        "the first exercises in leftOverExercises",
        leftOverExercises[0]
      );
      setCurrentExercise(leftOverExercises[0]);
    }
    console.log("leftoverrrr", leftOverExercises);

    if (leftOverExercises.length === 0) {
      setFinish(true);
    }

    // function getCorrectExercise(arr1, arr2) {
    //   let correctExercise = [];
    //   console.log("do we get here AGAIN?", arr1);
    //   console.log("what about here AGAIN?", arr2);
    //   for (let i = 0; i < arr1.length; ++i) {
    //     for (let j = 0; j < arr2.length; ++j) {
    //       if (arr1[i].id === arr2[j].id) {
    //         correctExercise.push(arr1[i]);
    //       }
    //     }
    //   }
    //   console.log("correct", correctExercise);
    //   return correctExercise;
    // }

    // const correctExercise = getCorrectExercise(
    //   allCurrentExercises,
    //   commonElements
    // );
    // const correctExercise = allCurrentExercises.find((x) => {
    //   console.log("what is x actually?", x);
    //   commonElements.find((y) => {
    //     console.log("hello");
    //     if (x.id !== y.id) {
    //       return x;
    //     }
    //   });
    // console.log("what is com", com);
    // return com;
    // // });
    // console.log("CORRECT EXERCISE", correctExercise);

    // setCurrentExercise(correctExercise);

    // console.log("THE COMMON ELEMENTS", commonElements);
  }, [completedExercises, allCurrentExercises]);

  //   useEffect(() => {
  //     allCurrentExercises.find((x) => {
  // for i in x;
  // if i in completed;
  // const result = i
  // console.log(result
  //   )

  //       console.log("X", x);
  //       completedExercises.find((completed) => {
  //         console.log("COMPLETED", completed.quizQuestionId);
  //         console.log("X.ID", x.id);
  //         if (completed.quizQuestionId !== x.id) {
  //           console.log("what is x?", x);
  //           setCurrentExercise(x);
  //         } else {
  //           console.log("no!");
  //           return false;
  //         }
  //       });

  //       // console.log("the correct EXERCISSSSEEEE", correctExercise);
  //       // if (correctExercise) {
  //       //   console.log("the correct EXERCISSSSEEEE", correctExercise);
  //       //   setCurrentExercise(correctExercise);
  //       // }
  //     });
  //     // completedExercises.forEach((item) => {
  //     //   const correctExercise = allCurrentExercises.find((x) => {
  //     //     if (item.quizQuestionId !== x.id) {
  //     //       return true;
  //     //     } else {
  //     //       return false;
  //     //     }
  //     //   });

  //     //it is 0 from the start, later on turns into 1 but then already went here..

  //     // console.log("is it 0?", completedExercises.length);
  //     // if (completedExercises.length === 0) {
  //     //   const correctExercise = allCurrentExercises.find(
  //     //     (item) => item.level === "level 1"
  //     //   );
  //     //   setCurrentExercise(correctExercise);
  //     // }
  //   }, [completedExercises, allCurrentExercises]);
  //   console.log("completed exercises", completedExercises);

  useEffect(() => {
    dispatch(getCompletedExercises());
    dispatch(getExerciseById(exerciseId));
  }, [dispatch, exerciseId]);
  // console.log("current exercise", currentExercise);

  const questionFormat = () => {
    if (currentExercise && currentExercise.level === "level 1") {
      return <QuizCards exercise={currentExercise} />;
    } else if (currentExercise && currentExercise.level === "level 2") {
      return <QuizCode exercise={currentExercise} />;
    } else {
      //return some loading indicator would be better
      // console.log("test");
      return null;
    }
  };

  return <div>{!finish ? questionFormat() : "You are finished!"}</div>;
}
