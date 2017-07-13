
'use strict';
import React,{Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Navigator from './Navigator'
import thunk from 'redux-thunk';

import * as reducers from './reducers';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const rootReducer = combineReducers(reducers);
const store = createStoreWithMiddleware(rootReducer);
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
