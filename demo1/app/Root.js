
'use strict';
import React,{Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Navigator from './Navigator'
import thunk from 'redux-thunk';

import reducers from './reducers/index';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
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
