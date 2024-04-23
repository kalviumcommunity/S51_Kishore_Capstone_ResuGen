const initialState = {
  experienceFormData: {
    positionTitle: "",
    companyName: "",
    startDate: "",
    lastDate: "",
    workSummary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ipsam commodi velit saepe dolorum sunt fuga ea harum eveniet? Reiciendis odio quia eveniet dolorem numquam repudiandae incidunt unde placeat fugiat.",
  }
};



const experienceInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_EXPERIENCE":
      return { ...state, 
        experienceFormData: {
          ...state.experienceFormData,
          ...action.payload,
        }
      };
    default:
      return state;
  }
};

export default experienceInfoReducer;
