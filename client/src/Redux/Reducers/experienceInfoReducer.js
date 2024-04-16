const initialState = {
  positionTitle: "",
  companyName: "",
  startDate: "",
  lastDate: "",
  workSummary: "",
};

const experienceInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EXPERIENCE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};



export default experienceInfoReducer;
