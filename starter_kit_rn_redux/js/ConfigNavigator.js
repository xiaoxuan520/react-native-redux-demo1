import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Navigator }  from 'react-native-deprecated-custom-components';

import Home from './component/Home';

export default class ConfigNavigator extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let name = 'Home';
    let home = Home;
    return (
      <Navigator
       initialRoute={{ name: name, component: home }}
       configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
       renderScene={(route, navigator) => {
         let Component = route.component;
         return <Component {...route.params} navigator={navigator} />
       }} />
    );
  }
}
/*

 */
