import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import Tab from './Tab'
const {FBLoginManager} = require('react-native-facebook-login');
import * as firebase from 'firebase';

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

export const firebaseApp = firebase.initializeApp(config)

export default class Welcome extends Component {

  constructor(props) {
    super(props)
    this.db = firebaseApp.database()
    this.userId = 0;
  }

  // listenForItems(dbRef) {
  //   dbRef.on('value', snap => console.log("VALUE SHOULD BE HERE:", snap.val()))
  // }

  // does not remove test property on update command
  writeUserData(user) {
    this.setState({ userId: user.uid })
    this.db.ref('users/' + user.uid).update({
      userId: user.uid,
      email: user.email,
      name: user.displayName
    })
    this.db.ref('emailsUsers/' +
      user.email.slice(0, user.email.indexOf('.'))
    ).update({
      userId: user.uid
    })
  }

  _fbAuth(navigate) {

      FBLoginManager.loginWithPermissions(['email'], (error, data) => {
        if (!error) {
          const credential = firebase.auth.FacebookAuthProvider.credential(data.credentials.token);
          firebase
            .auth()
            .signInWithCredential(credential)
            .then((user) => {
              this.writeUserData(user)
              navigate('Tab', { userId: this.state.userId })
            })
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
          onPress={() => this._fbAuth(navigate)}>
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

