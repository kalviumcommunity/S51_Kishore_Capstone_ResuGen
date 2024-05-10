import { combineReducers } from 'redux';
import personalInfoReducer from './personalInfoReducer';
import experienceReducer from './experienceInfoReducer';
import educationInfoReducer from "./educationInfoReducer";
import skillsInfoReducer from './skillsInfoReducer';

const rootReducer = combineReducers({
  personalInfo: personalInfoReducer,
  experienceInfo: experienceReducer,
  educationInfo: educationInfoReducer,
  skillsInfo: skillsInfoReducer
});

export default rootReducer;
