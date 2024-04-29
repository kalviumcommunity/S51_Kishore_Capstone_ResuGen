import { ADD_EXPERIENCE, ADD_NEW_EXPERIENCE, DELETE_EXPERIENCE } from "./../Actions/actionTypes";

const initialState = {
  experienceDataList: [
    // Initial set of experience information
    {
      PositionTitle: "",
      CompanyName: "",
      StartDate: "",
      LastDate: "",
      WorkSummary: "",
    },
  ],
};

const experienceInfoReducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case ADD_EXPERIENCE:
      return {
        ...state,
        experienceDataList: state.experienceDataList.map((formData, index) =>
          index === action.index ? { ...formData, ...action.payload } : formData
        ),
      };
    case ADD_NEW_EXPERIENCE:
      return {
        ...state,
        experienceDataList: [
          ...state.experienceDataList,
          { ...initialState.experienceDataList[0] },
        ],
      };
    case DELETE_EXPERIENCE:
      return {
        ...state,
        experienceDataList: state.experienceDataList.filter(
          (_, index) => index !== action.index
        ),
      };
    default:
      return state;
  }
};

export default experienceInfoReducer;
