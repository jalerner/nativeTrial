
import React, { Component } from 'react';
import { stringify } from 'query-string';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


export default class Card extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <View>
        <Text>{this.props.venue.name}</Text>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   card: {
//     alignItems: 'center',
//     borderRadius: 5,
//     overflow: 'hidden',
//     borderColor: 'grey',
//     backgroundColor: 'white',
//     borderWidth: 1,
//     elevation: 1,
//   },
//   thumbnail: {
//     flex: 1,
//     width: 300,
//     height: 300,
//   },
//   text: {
//     fontSize: 20,
//     paddingTop: 10,
//     paddingBottom: 10
//   },
//   noMoreCards: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// })
