import { combineReducers } from 'redux';
import personalInfoReducer from './personalInfoReducer';
import experienceReducer from './experienceInfoReducer';
import educationInfoReducer from "./educationInfoReducer"

const rootReducer = combineReducers({
  personalInfo: personalInfoReducer,
  experienceInfo: experienceReducer,
  educationInfo: educationInfoReducer,
});

export default rootReducer;
