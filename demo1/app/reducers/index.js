
import {combineReducers} from 'redux';
import reducer from './Reducer';
import homeTwoReducer from  './HomeTwoReducer';

const rootReducer = combineReducers({
    reducer,
    homeTwoReducer
});

export default rootReducer;