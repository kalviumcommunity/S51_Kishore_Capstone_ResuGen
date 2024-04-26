import {
  UPDATE_PERSONAL_INFO,
  ADD_EXPERIENCE,
  UPDATE_EDUCATION,
  UPDATE_SKILLS,
  ADD_EDUCATION,
  ADD_NEW_EXPERIENCE,
  ADD_NEW_EDUCATION,
  ADD_NEW_SKILLS,
} from "./actionTypes";

export const updatePersonalInfo = (info) => ({
  type: UPDATE_PERSONAL_INFO,
  payload: info,
});

export const addExperience = (payload, index) => {
  return {
    type: ADD_EXPERIENCE,
    payload,
    index,
  };
};

export const addNewExperience = () => {
  return {
    type: ADD_NEW_EXPERIENCE,
  };
};

export const updateEducation = (payload, index) => ({
  type: UPDATE_EDUCATION,
  payload,
  index,
});

export const addNewEducation = () => {
  return {
    type: ADD_NEW_EDUCATION,
  };
};

export const updateSkills = (info) => ({
  type: UPDATE_SKILLS,
  payload: info,
});

export const addNewSkills = () => {
  return {
    type: ADD_NEW_SKILLS,
  };
};

export const addEducation = (education) => ({
  type: ADD_EDUCATION,
  payload: education,
});
