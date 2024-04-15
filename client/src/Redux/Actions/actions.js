import experienceInfoReducer from '../Reducers/experienceInfoReducer';
import { UPDATE_PERSONAL_INFO, ADD_EXPERIENCE } from './actionTypes'; // make sure UPDATE_EXPERIENCE is imported

export const updatePersonalInfo = (info) => ({
  type: UPDATE_PERSONAL_INFO,
  payload: info,
});

export const addExperience = (experience) => ({
  type: ADD_EXPERIENCE,
  payload: experience,
});
