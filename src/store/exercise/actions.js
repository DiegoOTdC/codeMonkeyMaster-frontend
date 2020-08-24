import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading } from "../appState/actions";

export const GET_EXERCISE_SUCCESS = "GET_EXERCISE_SUCCESS";

const getExerciseSuccess = (exercise) => {
  return {
    type: GET_EXERCISE_SUCCESS,
    payload: exercise,
  };
};

export const getExerciseById = (id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;

    dispatch(appLoading());
    try {
      //uncomment after setting up route on backend
      // const response = axios.get(`${apiUrl}/exercise/${id}`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      // dispatch(getExerciseSuccess(response.data));

      //test
      dispatch(
        getExerciseSuccess({
          name: "Map method",
          content: "blablabla",
          correctAnswer: `console.log("hello world")`,
        })
      );

      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
