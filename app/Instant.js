
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 // venues/search?ll=40.7,-74&openNow=true&limit=30&radius=800&categoryId=4d4b7104d754a06370d81259,4d4b7105d754a06373d81259,4d4b7105d754a06374d81259,4d4b7105d754a06376d81259,4d4b7105d754a06377d81259,4d4b7105d754a06378d81259&intent=browse

import React, { Component } from 'react';
import Item from './Card';
import SwipeCards from 'react-native-swipe-cards';
import Loading from './Loading';
import { stringify } from 'query-string';
import Tabs from 'react-native-tabs';
import Tab from './Tab'
import NoCards from './NoCards'
const _ = require('lodash');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Linking
} from 'react-native';

const CLIENT_ID = '40a55d80f964a52020f31ee3';
const TOKEN = '2ONTTMJ3BVPLQWWICXYE04SMVFZWCC5D3YWIUHHEIZJOD4ZF';
const v = '20170803';
const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore';
const API_DEBOUNCE_TIME = 2000;

import {
  StackNavigator,
} from 'react-navigation';


export default React.createClass({
  getInitialState() {
    return {
      cards: [],
      outOfCards: false,
      headerLocation: null,
      last4sqCall: {},
      region: null,
      gpsAccuracy: null,
      watchID: null
    }
  },
  handleYup (card) {
    const url = `http://maps.apple.com/?saddr=(${this.state.region.latitude}, ${this.state.region.longitude})&daddr=(${card.venue.location.lat},${card.venue.location.lng})&dirflg=w`;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  },
  handleNope (card) {
    console.log("the card", card)
  },
  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        })
      }

    }

  },
  componentWillMount() {
    this.state.watchID = navigator.geolocation.watchPosition((position) => {
          let region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.00922*1.5,
              longitudeDelta: 0.00421*1.5
          }
          this.onRegionChange(region, position.coords.accuracy);
        })
  },
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchID);
  },
  onRegionChange(region, gpsAccuracy) {
    this.fetchVenues(region);
    this.setState({
      region: region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
    })
  },

  fetchVenues(region, lookingFor) {
    // if (!this.shouldFetchVenues(lookingFor)) return;
    const query = this.venuesQuery(region, lookingFor);
    console.log("HERE IS THE QUERY:", query)
    fetch(`${FOURSQUARE_ENDPOINT}?${query}`)
      .then(fetch.throwErrors)
      .then(res => res.json())
      .then(json => {
        if (json.response.groups) {
          this.setState({
            cards: _.shuffle(json.response.groups.reduce(
              (all, g) => all.concat(g ? g.items : []), []
            )),
            headerLocation: json.response.headerLocation,
            last4sqCall: new Date()
          });
        }
      })
        .catch(err => console.log(err));
  },

venuesQuery({ latitude, longitude }, lookingFor) {
  return stringify({
    ll: `${latitude}, ${longitude}`,
    oauth_token: TOKEN,
    v: v,
    limit: 30,
    openNow: 1,
    radius: 800,
    venuePhotos: 1,
    intent: 'browse'
  });
},
  render() {
    console.log(this.state.cards)
    console.log("Instant", this.props)
    return (
      <View style={styles.container}>
      {
        this.state.cards.length
        ?
          <View style={styles.container} >
            <SwipeCards
              cards={this.state.cards}
              loop={false}
              renderNoMoreCards={() => <NoCards />}
              renderCard={(cardData) => <Item {...cardData} />}
              showYup={true}
              showNope={true}
              handleYup={this.handleYup}
              handleNope={this.handleNope}
          />
        </View>
      :
        <Loading />
    }
    </View>
    )
  }
})

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
