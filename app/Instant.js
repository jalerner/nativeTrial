
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Card from './Card';
import SwipeCards from 'react-native-swipe-cards';
import Loading from './Loading';
import { stringify } from 'query-string';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
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
      last4sqCall: {}
    }
  },
  handleYup (card) {
    console.log("yup")
  },
  handleNope (card) {
    console.log("nope")
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
    let region = {
      latitude: '37.785834',
      longitude: '-122.406417'
    }
    this.fetchVenues(region, 'food')
  },

  fetchVenues(region, lookingFor) {
    // if (!this.shouldFetchVenues(lookingFor)) return;
    const query = this.venuesQuery(region, lookingFor);
    fetch(`${FOURSQUARE_ENDPOINT}?${query}`)
      .then(fetch.throwErrors)
      .then(res => res.json())
      .then(json => {
        if (json.response.groups) {
          this.setState({
            cards: json.response.groups.reduce(
              (all, g) => all.concat(g ? g.items : []), []
            ),
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
    section: lookingFor || this.state.lookingFor || 'food',
    limit: 10,
    openNow: 1,
    venuePhotos: 1
  });
},
  render() {
    return (
      <View style={styles.container}>
      {
        this.state.cards.length
        ?
          <SwipeCards
            cards={this.state.cards}
            loop={false}

            renderCard={(cardData) => <Card {...cardData} />}
            showYup={true}
            showNope={true}

            handleYup={this.handleYup}
            handleNope={this.handleNope}
            cardRemoved={this.cardRemoved}
        />
      :
        <Loading/>
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
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
