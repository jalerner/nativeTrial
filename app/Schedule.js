
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PlannedItem from './PlannedItem';
import Loading from './Loading';
import { stringify } from 'query-string';
import Tabs from 'react-native-tabs';
import Tab from './Tab'
import NoCards from './NoCards'
import {Button, Content, Container} from 'native-base'
const _ = require('lodash');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native';

const CLIENT_ID = '40a55d80f964a52020f31ee3';
const TOKEN = '2ONTTMJ3BVPLQWWICXYE04SMVFZWCC5D3YWIUHHEIZJOD4ZF';
const v = '20170803';
const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/search';
const API_DEBOUNCE_TIME = 2000;

import {
  StackNavigator,
} from 'react-navigation';


export default class Schedule extends Component{
  constructor(props) {
    super(props);
    this.state={
      cards: {},
      savedDay: undefined,
      currentPlaceIndex: 0,
      outOfCards: false,
      headerLocation: null,
      last4sqCall: {},
      region: null,
      gpsAccuracy: null,
      watchID: null,
      ready: false,
      catID: this.props.navigation.state.params.category
    }
    this.refresh = this.refresh.bind(this)
    this.handleGo = this.handleGo.bind(this)
    this.takeMe = this.takeMe.bind(this)
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
          let region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.00922*1.5,
              longitudeDelta: 0.00421*1.5
          }
          this.onRegionChange(region, position.coords.accuracy);
        })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchID);
  }

  onRegionChange(region, gpsAccuracy) {
    this.fetchVenues(region);
    this.setState({
      region: region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
    })
  }

  refresh(key){
    console.log('refresh')
    console.log(key)
    let currentCards = this.state.cards
    currentCards[key].index += 1
    this.setState({cards: currentCards})
  }

  takeMe(lat, lng){
    const url = `http://maps.apple.com/?saddr=(${this.state.region.latitude}, ${this.state.region.longitude})&daddr=(${lat},${lng})&dirflg=w`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
    let updateIndex = this.state.savedDay
    updateIndex[this.state.currentPlaceIndex].go = 'complete';
    if(updateIndex[this.state.currentPlaceIndex + 1]) updateIndex[this.state.currentPlaceIndex + 1].go = true;
    this.setState({savedDay: updateIndex, currentPlaceIndex: this.state.currentPlaceIndex+=1})
  }

  handleGo(){
    const newPlaces = Object.keys(this.state.cards).map(key => {
      return({venue: this.state.cards[key].places[this.state.cards[key].index], go:false})
    })
    newPlaces[0].go = true
    this.setState({ready: true, savedDay: newPlaces})
  }


  fetchVenues(region, lookingFor) {
    const query = this.venuesQuery(region, lookingFor);
    Promise.all(this.state.catID.map(category => {
      return(fetch(`${FOURSQUARE_ENDPOINT}?categoryId=${category}&${query}`)
             .then(fetch.throwErrors)
              .then(res => res.json())
              .then(json => {
                console.log("LOOK HREE", json.response)
                let currCards = this.state.cards
                currCards[category] = {index: 0, places: json.response.venues, go: false}
                console.log(currCards)
                this.setState({cards: currCards})
              })
             )
    })
    )
    .catch(err => console.log(err));
  }

  venuesQuery({ latitude, longitude }, lookingFor) {
    return stringify({
      ll: `${latitude}, ${longitude}`,
      oauth_token: TOKEN,
      v: v,
      limit: 10,
      openNow: 1,
      radius: 800,
      venuePhotos: 1
    });
  }
  render() {
    console.log(this.state)
    return (
        <Container>
          {this.state.savedDay ?
            this.state.savedDay.map(item => {
              return (
                        <PlannedItem key={item.venue.name} ready={this.state.ready} go={item.go} venue={item.venue} takeMe={this.takeMe} />
                      )
            })

            :
          <Content scrollEnabled={true}>
            {this.state.cards ?
              Object.keys(this.state.cards).map(key => {
                return (
                          <PlannedItem key={key} catId={key} ready={this.state.ready} refresh={this.refresh} go={this.state.cards[key].go} venue={this.state.cards[key].places[this.state.cards[key].index]} />
                        )
              })
              :
              <Loading />
            }
          {!this.state.ready &&
           <Button style={styles.letsGo} rounded success onPress={this.handleGo}>
              <Text style={{color: 'white'}}>Let's Go!</Text>
            </Button>
          }
          </Content>
        }
        </Container>


    )
  }
}

const styles = StyleSheet.create({
  container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 20
    },
  letsGo: {
    marginTop: 10,
    alignSelf: 'center'
  }
})

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
