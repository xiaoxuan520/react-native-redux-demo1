
'use strict';
import React,{Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import * as reducers from './reducers';
const createStoreWithMiddleware = applyMiddleware(thunk,reduxPromise)(createStore);
const rootReducer = combineReducers(reducers);
const store = createStoreWithMiddleware(rootReducer);
import Navigator from './Navigator'
import { Provider } from 'react-redux';
class Root extends Component {
    render(){
        return (
            <Provider store={store}>
                <Navigator/>
            </Provider>
        )
    }
}

export default Root
