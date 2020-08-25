import { GET_EXERCISE_SUCCESS } from "./actions";

const initialState = {
  name: "",
  content: "",
  correctAnswer: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EXERCISE_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
