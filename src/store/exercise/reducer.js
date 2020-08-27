import { GET_EXERCISE_SUCCESS, SET_QUIZ_QUESTIONS } from "./actions";

const initialState = {
  exercises: [],
  questions: [],
  name: {},
  content: {},
  correctAnswer: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUIZ_QUESTIONS:
      return {
        ...state,
        questions: [...state.questions, ...action.payload],
      };
    case GET_EXERCISE_SUCCESS:
      return {
        ...state,
        exercises: [...action.payload],
      };

    default:
      return state;
  }
};
