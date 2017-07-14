
'use strict';
import React,{Component} from 'react';
import ConfigureStore from './store';
import Navigator from './Navigator'
import { Provider } from 'react-redux';
class Root extends Component {
    render(){
        return (
            <Provider store={ConfigureStore()}>
                <Navigator/>
            </Provider>
        )
    }
}

export default Root
