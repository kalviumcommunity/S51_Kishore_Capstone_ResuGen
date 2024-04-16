const initialState = {
  schoolName: "",
  schoolLocation: "",
  startDate: "",
  endDate: "",
  degree: "",
  fieldOfStudy: "",
};


// Define the reducer function to handle education information updates
const userEducationInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_EDUCATION":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userEducationInfoReducer;
