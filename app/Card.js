
import React, { Component } from 'react';
import { stringify } from 'query-string';
import { Card, Button } from 'react-native-elements'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


export default class Item extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    console.log(this.props.venue)
    const photoItem = this.props.venue.featuredPhotos.items[0];
    return (
        <Card
          title={this.props.venue.name}
          image={{uri: `${photoItem.prefix}${photoItem.width}x${photoItem.height}${photoItem.suffix}` }}>
          <Text style={styles.quote}>
            "{this.props.tips[0].text}" - {this.props.tips[0].user.firstName}
          </Text>
          <Button
            icon={{name: 'favorite'}}
            backgroundColor='#ee6e73'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='SAVE' />
      </Card>
    );
  }
}


const styles = StyleSheet.create({
quote: {
    marginBottom: 10,
    fontStyle:'italic'
  }
})
