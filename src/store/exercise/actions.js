import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading, setMessage } from "../appState/actions";
import { selectToken } from "../user/selectors";

export const GET_EXERCISE_SUCCESS = "GET_EXERCISE_SUCCESS";
export const SET_QUIZ_QUESTIONS = "SET_QUIZ_QUESTIONS";

export const setQuizQuestions = (data) => {
  return {
    type: SET_QUIZ_QUESTIONS,
    payload: data
  }
}

export const getExerciseSuccess = (exercise) => {
  return {
    type: GET_EXERCISE_SUCCESS,
    payload: exercise,
  };
};

export const getExercises = () => {
  return async (dispatch, getState) => {
    const tokenNeeded = getState().user.token
    const response = await axios.get(`${apiUrl}/exercises/list`,{
      headers: {
        Authorization: `Bearer ${tokenNeeded}`
      }
    });
    // console.log("response.data", response.data);
    dispatch(getExerciseSuccess(response.data));
  };
};

export const getExerciseById = (id) => {
  console.log("what is id in actions", id);
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/exercises/${id}/quiz`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setQuizQuestions(response.data));

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
