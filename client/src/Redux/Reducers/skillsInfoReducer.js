  const initialState = {
    skillsFormData: { skills: "", expertiseLevel: "" },
  };

  const skillsInfoReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
      case "UPDATE_SKILLS":
        return {
          ...state,
          skillsFormData: {
            ...state.skillsFormData,
            ...action.payload,
          },
        };
      default:
        return state;
    }
  };

  export default skillsInfoReducer;