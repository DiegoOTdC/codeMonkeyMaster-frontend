import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"

import QuizCards from "../../components/QuizCards"
import QuizCode from "../../components/QuizCode"
import { getRandomQuestions } from "../../store/exercise/actions"
import { selectExercise } from "../../store/exercise/selectors"
import { selectCompletedExercises } from "../../store/user/selectors";

export default function RandomExercise(){
    const history = useHistory()
    const dispatch = useDispatch()
    const questions = useSelector(selectExercise)
    const completedQuestions = useSelector(selectCompletedExercises)
    const [currentExercise, setCurrentExercise] = useState("");
    const [finish, setFinish] = useState(false);


    useEffect(() => {
        //check if any of the exercises are completed by user, add to new array "commonElements"
        function getCommon(arr1, arr2) {
          let common = [];
          for (let i = 0; i < arr1.length; ++i) {
            for (let j = 0; j < arr2.length; ++j) {
              if (arr1[i].id === arr2[j].quizQuestionId) {
                common.push(arr1[i]);
              }
            }
          }
          return common;
        }
        const commonElements = getCommon(questions, completedQuestions);
    
        //Create a new array that has all exercises the user has not done yet (allCurrentExercises - commonElements) = leftOverExercises
        const leftOverExercises = questions.filter((el) => {
          return !commonElements.includes(el);
        });
    
        if (leftOverExercises.length !== 0) {
          setCurrentExercise(leftOverExercises[0]);
        }
    
        if (leftOverExercises.length === 0 && commonElements.length !== 0) {
          setFinish(true);
        }
      }, [completedQuestions, questions]);

    useEffect(() => {
        dispatch(getRandomQuestions())
    }, [dispatch])

    const questionFormat = () => {
        if (currentExercise && currentExercise.level === "level 1") {
          return <QuizCards exercise={currentExercise} />;
        } else if (currentExercise && currentExercise.level === "level 2") {
          return <QuizCode exercise={currentExercise} />;
        } else {
          //return some loading indicator would be better
          return null;
        }
      };

    return <div>{!finish ? questionFormat() : history.push("/homepage")}</div>;
}