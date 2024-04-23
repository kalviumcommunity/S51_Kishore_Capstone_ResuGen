import { UPDATE_PERSONAL_INFO, ADD_EXPERIENCE, UPDATE_EDUCATION, UPDATE_SKILLS, ADD_EDUCATION } from './actionTypes'; 

export const updatePersonalInfo = (info) => ({
  type: UPDATE_PERSONAL_INFO,
  payload: info,
});

export const addExperience = (experience) => ({
  type: ADD_EXPERIENCE,
  payload: experience,
});

export const updateEducation = (info) => ({
  type: UPDATE_EDUCATION,
  payload: info,
})

export const updateSkills = (info, dispatch) => {
  console.log(info)
  return dispatch({
    type: UPDATE_SKILLS,
    payload: info
  })
}



export const addEducation = (education) => ({
  type: ADD_EDUCATION,
  payload: education,
});
