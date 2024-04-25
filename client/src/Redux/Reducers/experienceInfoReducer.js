const initialState = {
  experienceFormData: {
    positionTitle: "Software Engineer",
    companyName: "Tech Innovations Inc.",
    startDate: "July 2015",
    lastDate: "Present",
    workSummary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ipsam commodi velit saepe dolorum sunt fuga ea harum eveniet? Reiciendis odio quia eveniet dolorem numquam repudiandae incidunt unde placeat fugiat.",
    experiences: {} // Initialize as an empty object
  }
};

const experienceInfoReducer = (state = initialState, action) => {
  console.log(action.payload, action.type);
  switch (action.type) {
    case "ADD_EXPERIENCE":
      return {
        ...state,
        experienceFormData: {
          ...state.experienceFormData,
          ...action.payload,
        },
      };
    case "ADD_NEW_EXPERIENCE":
      // Generate a unique key for the new experience object
      const newKey = `experience${Object.keys(state.experienceFormData.experiences).length + 1}`;
      return {
        ...state,
        experienceFormData: {
          ...state.experienceFormData,
          experiences: {
            ...state.experienceFormData.experiences,
            [newKey]: action.payload, // Add the new experience object with the unique key
          },
        },
      };
    default:
      return state;
  }
};

export default experienceInfoReducer;
