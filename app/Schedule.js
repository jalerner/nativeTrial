
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
import {Button} from 'native-base'
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


  fetchVenues(region, lookingFor) {
    const query = this.venuesQuery(region, lookingFor);
    Promise.all(this.state.catID.map(category => {
      return(fetch(`${FOURSQUARE_ENDPOINT}?categoryId=${category}&${query}`)
             .then(fetch.throwErrors)
              .then(res => res.json())
              .then(json => {
                console.log(json.response.venues)
                let currCards = this.state.cards
                currCards[category] = {index: 0, places: json.response.venues}
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
    console.log(this.state.cards)
    return (
        <View>
        {this.state.cards ?
          Object.keys(this.state.cards).map(key => {
            return (
                      <PlannedItem catId={key} ready={this.state.ready} refresh={this.refresh} venue={this.state.cards[key].places[this.state.cards[key].index]} />
                    )
          })
          :
          <Loading />
        }
        {!this.state.ready &&
         <Button rounded success onPress={()=>this.setState({ready:true})}>
            <Text style={{color: 'white'}}>Let's Go!</Text>
          </Button>
        }
        </View>


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
