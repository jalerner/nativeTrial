import React, { Component } from 'react';
import { stringify } from 'query-string';
import { Card, Button } from 'react-native-elements'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  }
})
