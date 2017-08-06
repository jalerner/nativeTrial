import React, { Component } from 'react';
import { stringify } from 'query-string';
import { Card, Button, Icon } from 'react-native-elements'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Linking
} from 'react-native';


export default class PlannedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
    this.getDirections = this.getDirections.bind(this)
  }
  getDirections(lat, lng){
    const url = `http://maps.apple.com/?saddr=(${this.props.region.latitude}, ${this.props.region.longitude})&daddr=(${lat},${lng})&dirflg=w`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
    this.setState({show: false})
  }

  render() {
    console.log(this.props)
    return (
        <Card
          title={this.props.venue.name}>
          {!this.props.ready &&
          <Icon
            raised
            reverse
            name='refresh'
            type='font-awesome'
            color='#f50'
            onPress={() => this.props.refresh(this.props.catId)} />
          }
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
