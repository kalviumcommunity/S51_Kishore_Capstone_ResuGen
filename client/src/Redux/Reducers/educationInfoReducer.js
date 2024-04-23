const initialState = {
  educationFormData: {
    schoolName: "",
    schoolLocation: "",
    startDate: "",
    endDate: "",
    degree: "",
    fieldOfStudy: "",
  },
};

const educationInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_EDUCATION":
      return {
        ...state,
        educationFormData: {
          ...state.educationFormData,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default educationInfoReducer;
