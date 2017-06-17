/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
import { Main } from './Main';


var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  }
});

export default class githubNotTaker extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: Main,
          title: 'Github Note Taker'
        }}
        style={{flex: 1}}
        />
    );
  }
}

AppRegistry.registerComponent('githubNotTaker', () => githubNotTaker);
