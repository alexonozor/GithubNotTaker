import React, { Component } from 'react';
var api = require('./ios/Utils/api');
import { Dashboard } from './Dashboard'

import {
   Text,
   View,
   StyleSheet,
   TextInput,
   TouchableHighlight,
   ActivityIndicator
} from 'react-native';

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
});


export class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            isLoading: false,
            error: true
        }
    }

    handleChange(event) {
        this.setState({
            userName: event.nativeEvent.text
        })
    }

    handleSubmit(event) {
       this.setState({
           isLoading: true
       })
       api.getBio(this.state.userName)
       .then((res) => {
           if (res.message === 'Not Found') {
            this.setState({
                error: 'User not found',
                isLoading: false
            })
           } else {
               this.props.navigator.push({
                    title: res.name || 'Select an option',
                    component: Dashboard,
                    passProps: { userInfo: res }
               });
               this.setState({
                   isLoading: false,
                   userName: '',
                   error: false
               })
           }
       })
    }

    render() {
        var showErr = (
                this.state.error ? <Text> {this.state.error} </Text> : <View></View>
            );
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Search for Github user</Text>
                <TextInput 
                    style={styles.searchInput}
                    value={this.state.userName}
                    onChange={this.handleChange.bind(this)} />
                <TouchableHighlight
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor='white'
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
                <ActivityIndicator
                    animating={this.state.isLoading}
                    color="#111"
                    size="large" />
               {showErr}
            </View>
        )
    }
}

