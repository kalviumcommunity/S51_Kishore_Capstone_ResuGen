import { createStore } from 'redux';
import rootReducer from './Reducers/combineReducers';

const store = createStore(rootReducer);

export default store;
