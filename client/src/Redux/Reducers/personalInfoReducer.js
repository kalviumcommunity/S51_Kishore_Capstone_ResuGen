const initialState = {
  firstName: "John",
  lastName: "",
  email: "",
  phone: "",
  jobTitle: "",
  city: "",
  zipCode: "",
  state: "",
  country: "",
  profileDescription: "",
};

const personalInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default personalInfoReducer;
