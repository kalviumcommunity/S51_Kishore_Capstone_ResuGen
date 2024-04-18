import { combineReducers } from 'redux';
import personalInfoReducer from './personalInfoReducer';
import experienceReducer from './experienceInfoReducer';
import educationInfoReducer from "./educationInfoReducer";
import skillsInfo from './skillsInfoReducer';

const rootReducer = combineReducers({
  personalInfo: personalInfoReducer,
  experienceInfo: experienceReducer,
  educationInfo: educationInfoReducer,
  skillsInfo: skillsInfo
});

export default rootReducer;
