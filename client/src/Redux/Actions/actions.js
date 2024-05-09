import {
  UPDATE_PERSONAL_INFO,
  ADD_EXPERIENCE,
  UPDATE_EDUCATION,
  UPDATE_SKILLS,
  ADD_EDUCATION,
  ADD_NEW_EXPERIENCE,
  ADD_NEW_EDUCATION,
  ADD_NEW_SKILLS,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  DELETE_SKILLS,
  ADD_ADDITIONAL_INFOS,
  ADD_ACHIEVEMENT,
  DELETE_ACHIEVEMENT,
  UPDATE_ACHIEVEMENT,
  ADD_CERTIFICATE
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


export const deleteExperience = (index) => ({
  type: DELETE_EXPERIENCE,
  index,
});

export const deleteEducation = (index) => ({
  type: DELETE_EDUCATION,
  index
});

export const deleteSkills = (index) => ({
  type: DELETE_SKILLS,
  index,
})

export const additionalInfos = () => ({
  type: ADD_ADDITIONAL_INFOS
})

export const addAchievement = (achievement) => ({
  type: ADD_ACHIEVEMENT,
  payload: achievement,
});

export const updateAchievement = (achievement, index) => ({
  type: UPDATE_ACHIEVEMENT,
  payload: achievement,
  index,
});

export const deleteAchievement = (index) => ({
  type: DELETE_ACHIEVEMENT,
  index,
});

