// educationInfoReducer.js

import { UPDATE_EDUCATION, ADD_NEW_EDUCATION, DELETE_EDUCATION } from "../Actions/actionTypes";

const initialState = {
  educationFormData: [
    {
      schoolName: "",
      schoolLocation: "",
      startDate: "",
      endDate: "",
      degree: "",
      fieldOfStudy: "",
    },
  ],
};

const educationInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EDUCATION:
      return {
        ...state,
        educationFormData: state.educationFormData.map((formData, index) =>
          index === action.index ? { ...formData, ...action.payload } : formData
        ),
      };
    case ADD_NEW_EDUCATION:
      return {
        ...state,
        educationFormData: [
          ...state.educationFormData,
          { ...initialState.educationFormData[0] },
        ],
      };
    case DELETE_EDUCATION:
      return {
        ...state,
        educationFormData: state.educationFormData.filter((edu, index) => index !== action.index)
      };
    default:
      return state;
  }
};

export default educationInfoReducer;
