import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  GET_COMPLETED_EXERCISES_SUCCESS,
  REMOVE_COMPLETED_EXERCISES,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  completedExercises: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPLETED_EXERCISES_SUCCESS:
      return {
        ...state,
        completedExercises: [...state.completedExercises, ...action.payload],
      };

    case REMOVE_COMPLETED_EXERCISES:
      return { ...state, completedExercises: [] };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
