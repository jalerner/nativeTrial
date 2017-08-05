
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class Practice extends Component {

  render() {
    
    return (
      <View style={ styles.background }>
        <Text>REACHEDTHISPAGE</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(192, 57, 43, 1)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeImage: {
    resizeMode: 'contain',
    width: 200,
    height: 150
  },
  logoImage: {
    resizeMode: 'contain',
    width: 100
  },
  login: {
    marginTop: 100,
  }
});

