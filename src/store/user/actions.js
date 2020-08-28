import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const GET_COMPLETED_EXERCISES_SUCCESS =
  "GET_COMPLETED_EXERCISES_SUCCESS";

export const REMOVE_COMPLETED_EXERCISES = "REMOVE_COMPLETED_EXERCISES";

export const removeCompletedExercises = () => ({
  type: REMOVE_COMPLETED_EXERCISES,
});

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

const getCompletedExercisesSuccess = (completedExercises) => ({
  type: GET_COMPLETED_EXERCISES_SUCCESS,
  payload: completedExercises,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (fullName, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    console.log("full name", fullName);
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        fullName,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
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

export const login = (email, password) => {
  console.log("what is the apiURL", apiUrl);
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
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

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const getCompletedExercises = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/profile/completedExercises`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(getCompletedExercisesSuccess(response.data.exercisesCompleted));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(appDoneLoading());
    }
  };
};

export const updateCompletedExercise = (exerciseId, quizId, timeTaken, exp) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    if (token === null) return;
    dispatch(appLoading());
    try {
      const response = await axios.patch(
        `${apiUrl}/exercises/${exerciseId}/completed/${quizId}`,
        { timeTaken, exp },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 202) {
        dispatch(getCompletedExercisesSuccess([response.data.completed]));
        dispatch(tokenStillValid(response.data.user));
        dispatch(appDoneLoading());
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(appDoneLoading());
    }
  };
};

export function sendCompletedQuiz(exerciseId, quizId) {
  return async (dispatch, getState) => {
    const tokenNeeded = getState().user.token;
    try {
      const infoUpdated = await axios.patch(
        `${apiUrl}/exercises/${exerciseId}/quiz/completed/${quizId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenNeeded}`,
          },
        }
      );
      dispatch(getCompletedExercisesSuccess(infoUpdated.data.completedQuiz));
      dispatch(tokenStillValid(infoUpdated.data.user));
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function updateUser(fullName){
  return async function(dispatch, getState){
    const tokenNeeded = getState().token
    try{
      const user = await axios.patch(`${apiUrl}/profile/user`,{
        fullName,
      },{
        headers: {
          Authorization: `Bearer ${tokenNeeded}`
        }
      })
      console.log("user test", user)

      // dispatch(tokenStillValid(user.data))
      // dispatch(appDoneLoading())

    } catch(error){
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(appDoneLoading());
    }
  }
}
