const initialState = {
  formData: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    jobTitle: "Software Engineer",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    profileDescription:
      "A passionate software engineer with experience in building web applications.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione dolorum rerum necessitatibus",
  },
};

const personalInfoReducer = (state = initialState, action) => {
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
