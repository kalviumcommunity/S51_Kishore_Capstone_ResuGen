import { combineReducers } from 'redux';
import personalInfoReducer from './personalInfoReducer';
import experienceReducer from './experienceInfoReducer';

const rootReducer = combineReducers({
  personalInfo: personalInfoReducer,
  experienceInfo: experienceReducer,
  // Other reducers...
});

export default rootReducer;
