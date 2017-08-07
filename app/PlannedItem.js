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
            <Button
              raised
              buttonStyle={{backgroundColor: '#ff7043'}}
              icon={{name: 'refresh'}}
              title='Give Me Something new!'
              onPress={() => this.props.refresh(this.props.catId)} />
          }
          {this.props.go === 'complete' ? <Button raised disabled disabledStyle={{backgroundColor: '#4db6ac'}} icon={{name: 'check'}}
              title='COMPLETE' />
          :
            <View>
            {this.props.go && this.props.ready &&
              <Button buttonStyle={{backgroundColor: '#9ccc65'}} raised onPress={()=>this.props.takeMe(this.props.venue.location.lat, this.props.venue.location.lng)}
                icon={{name: 'directions-walk'}}
                title='TAKE ME THERE' />
            }
            </View>
          }
          {!this.props.go && this.props.ready &&
            <Button raised disabled disabledStyle={{backgroundColor: '#03a9f4'}}
              title='UPCOMING' />
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
