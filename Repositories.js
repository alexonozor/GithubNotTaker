import React, { Component } from 'react';
var api = require('./ios/Utils/api');
import { Dashboard } from './Dashboard';
import { Badge } from './Badge';
import { Web } from './Web'

import {
    ScrollView,
    Text,
    View,
    TouchableHighlight,
    StyleSheet
} from 'react-native';


var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    }
});


export class Repositories extends Component {
    openPage(url) {
       this.props.navigator.push({
           title: 'Web page',
           component: Web,
           passProps: { url: url }
       })
    }
    render() {
       var repos = this.props.repos;
        var list = repos.map((item, index) => {
            var desc = repos[index].description ? <Text style={styles.description}> {repos[index].description} </Text> : <View />;
            return (
                <View key={index}>
                    <View style={styles.rowContainer}>
                        <TouchableHighlight
                            onPress={this.openPage.bind(this, repos[index].html_url)}
                            underlayColor='transparent'>
                            <Text style={styles.name}>{repos[index].name}</Text>
                        </TouchableHighlight>
                        <Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
                        {desc}
                    </View>
                </View>
            )
        });
        return (
            <ScrollView style={styles.container}>
                <Badge userInfo={this.props.userInfo} />
                {list}
            </ScrollView>
        )
    }
}

Repositories.propTypes = {
    userInfo: React.PropTypes.object.isRequired,
    repos: React.PropTypes.array.isRequired
}