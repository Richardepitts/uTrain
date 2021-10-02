import { combineReducers } from 'redux';
import gainsOrientationReducer from './gainsOrientationReducer';

export default combineReducers({
    chosenOrientation: gainsOrientationReducer,
});