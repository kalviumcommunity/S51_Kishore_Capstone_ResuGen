const initialState = [{
  schoolName: "",
  schoolLocation: "",
  startDate: "",
  endDate: "",
  degree: "",
  fieldOfStudy: "",
}];

const educationInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_EDUCATION":
      // Find the index of the education entry to update
      const indexToUpdate = state.findIndex(
        education => education.id === action.payload.id
      );
      // Update the education entry if found
      if (indexToUpdate !== -1) {
        return [
          ...state.slice(0, indexToUpdate), // Entries before the updated one
          { ...state[indexToUpdate], ...action.payload }, // Updated entry
          ...state.slice(indexToUpdate + 1) // Entries after the updated one
        ];
      }
      // If the education entry is not found, return the current state
      return state;

    case "ADD_EDUCATION":
      return [...state, action.payload]; // Add new education entry to the state

    default:
      return state;
  }
};

export default educationInfoReducer;
