
import React, { Component } from 'react';
import Instant from './Instant';
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

export default class Welcome extends Component {

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={ styles.background }>
        <Image
          style={styles.welcomeImage}
          source={require('../public/shades.png')}/>
        <TouchableHighlight
          onPress={() => navigate('Instant')}>
          <Image
            style={styles.logoImage}
            source={require('../public/SeekLogo.png')}/>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(192, 57, 43, .9)',
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
  }
});

