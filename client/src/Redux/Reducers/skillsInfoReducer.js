const initialState = {
  skillsInfo: { skills: "", expertiseLevel: "" },
};

const skillsFormData = (state = initialState, action) => {
  console.log(action.payload)
  switch (action.type) {
    case "UPDATE_SKILLS":
      return {
        ...state,
        skillsInfo: {
          skills: action.payload.skills,
          expertiseLevel: action.payload.expertiseLevel,
        },
      };
    default:
      return state;
  }
};

export default skillsFormData;