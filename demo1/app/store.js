
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';//中间件
import reduxPromise from 'redux-promise';//中间件,在action里就不用dispatch了
import dataMiddleware from './middleware/DataMiddleware'
import * as reducers from './reducers';

//中间件集合
let middlewares = [
    thunk,
    reduxPromise,
    dataMiddleware
];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
export default function configureStore(){
    const rootReducer = combineReducers(reducers);
    const store = createStoreWithMiddleware(rootReducer);
    return store;
}