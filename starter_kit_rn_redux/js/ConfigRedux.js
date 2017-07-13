import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducer';
import ConfigNavigator from './ConfigNavigator';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class ConfigRedux extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConfigNavigator />
      </Provider>
    );
  }
}
