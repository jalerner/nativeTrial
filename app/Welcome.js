import React, { Component } from 'react';
import Instant from './Instant';
import { Button } from 'react-native-elements';
import Tab from './Tab'
const {FBLoginManager} = require('react-native-facebook-login');
import firebase from 'firebase'

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

var config = {
   apiKey: 'AIzaSyC09UlafkITOf_1Qvxss3HfJJ7TsE8ETA0',
   authDomain: 'stackathon-b6386.firebaseapp.com',
   databaseURL: 'https://stackathon-b6386.firebaseio.com'
}

const firebaseRef = firebase.initializeApp(config)

export default class Welcome extends Component {

  constructor(props) {
    super(props)
  }



  _fbAuth(navigate) {
        // const { navigate } = this.props.navigation

      FBLoginManager.loginWithPermissions(['email'], (error, data) => {
        if (!error) {
          const credential = firebase.auth.FacebookAuthProvider.credential(data.credentials.token);
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(() => navigate('Tab'))
            .catch(error => console.error(error));
        } else {
          console.log(error, data);
        }
      });
   }

  render() {
        const { navigate } = this.props.navigation

    return (
      <View style={ styles.background }>
        <Image
          style={styles.welcomeImage}
          source={require('../public/shades.png')}/>
        <TouchableHighlight
          onPress={() => navigate('Tab')}>
          <Image
            style={styles.logoImage}
            source={require('../public/SeekLogo.png')}/>
        </TouchableHighlight>
        <Button
          onPress={() => this._fbAuth(navigate)}
          style={styles.login}
          title='Login with Facebook'
          large={false}
          backgroundColor='#3d5a99'
          color='white'
          icon={{
            name: 'facebook-official',
            type: 'font-awesome',
            color: 'white'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(192, 57, 43, .97)',
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

