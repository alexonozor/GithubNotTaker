import React, { Component } from 'react';
var api = require('./ios/Utils/api');
import { Profile } from './Profile';
import { Repositories } from './Repositories';

import {
   Text,
   View,
   StyleSheet,
   TextInput,
   TouchableHighlight,
   Image
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

export class Dashboard extends React.Component{
  makeBackgroundColor(btn) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if (btn === 0) {
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1) {
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }
    return obj;
  }

  goToProfile() {
    this.props.navigator.push({
      component: Profile,
      title: 'Profile Page',
      passProps: { userInfo: this.props.userInfo }
    })
  }
  
  goToRepos() {
    api.getRepos(this.props.userInfo.login)
    .then((res) => {
      this.props.navigator.push({
        component: Repositories,
        title: 'Repos',
        passProps: { 
          userInfo: this.props.userInfo,
          repos: res
         }
      })
    })
  }

  goToNotes() {
   console.log('Going to Notes');
  }

render(){
  return (
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image} />
        <TouchableHighlight
          style={this.makeBackgroundColor(0)}
          underlayColor='#88D45F' 
          onPress={this.goToProfile.bind(this)}>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackgroundColor(1)}
          underlayColor='#88D45F' 
          onPress={this.goToRepos.bind(this)}>
          <Text style={styles.buttonText}>View Repo</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackgroundColor(2)}
          underlayColor='#88D45F' 
          onPress={this.goToProfile.bind(this)}>
          <Text style={styles.buttonText}>Add Note</Text>
        </TouchableHighlight>
      </View>
    )
}
};