import experienceInfoReducer from '../Reducers/experienceInfoReducer';
import { UPDATE_PERSONAL_INFO, ADD_EXPERIENCE, UPDATE_EDUCATION } from './actionTypes'; 

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