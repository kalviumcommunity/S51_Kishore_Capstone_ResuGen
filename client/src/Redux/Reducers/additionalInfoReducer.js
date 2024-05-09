import {
  ADD_ACHIEVEMENT,
  UPDATE_ACHIEVEMENT,
  DELETE_ACHIEVEMENT,
  // Add other action types for certificates, languages, accomplishments, etc.
} from "./actionTypes";

const initialState = {
  achievements: [],
  // Add initial states for other types of additional information
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACHIEVEMENT:
      return {
        ...state,
        achievements: [...state.achievements, action.payload],
      };

    case UPDATE_ACHIEVEMENT:
      return {
        ...state,
        achievements: state.achievements.map((achievement, index) =>
          index === action.index ? action.payload : achievement
        ),
      };

    case DELETE_ACHIEVEMENT:
      return {
        ...state,
        achievements: state.achievements.filter(
          (_, index) => index !== action.index
        ),
      };

    // Implement similar logic for certificates, languages, accomplishments, etc.

    default:
      return state;
  }
};

export default reducer;
