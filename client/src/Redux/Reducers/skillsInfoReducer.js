const initialState = {
    skills: "",
    expertiseLevel: ""
}

const skillsInfo = (state = initialState, action) => {
    switch(action.type){
        case "UPDATE_SKILLS":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default skillsInfo;