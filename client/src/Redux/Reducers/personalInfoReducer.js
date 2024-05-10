const initialState = {
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    profileDescription:
      "",
  },
};

const personalInfoReducer = (state = initialState, action) => {
  console.log(action.payload)
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload.formData,
        },
      };
    default:
      return state;
  }
};

export default personalInfoReducer;
