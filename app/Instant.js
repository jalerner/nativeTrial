
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Item from './Card';
import SwipeCards from 'react-native-swipe-cards';
import Loading from './Loading';
import { stringify } from 'query-string';
import Tabs from 'react-native-tabs';
import Tab from './Tab'
import * as firebase from 'firebase';
import NoCards from './NoCards'
const _ = require('lodash');
import { firebaseApp } from './Welcome';

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

export default class Instant extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      outOfCards: false,
      headerLocation: null,
      last4sqCall: {},
      sortedPlaces: []
    }
    this.db = firebaseApp.database()
    this.userPlaces = []
    this.handleYup = this.handleYup.bind(this)
    this.handleNope = this.handleNope.bind(this)
    this.test = [2,4,3,1]
  }

  handleYup (card) {
    console.log("yup")
    const url = "http://maps.apple.com/?saddr=(40.7045412,-74.0112249)&daddr=(40.706737, -74.006794)&dirflg=w";
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
    // update db
    this.yesUpdate(card)
  }

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
  }
  
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watchID);
  }

  onRegionChange(region, gpsAccuracy) {
     this.fetchVenues(region, 'food')
      .then(() => {
        this.updateUserPlaces()
      })
    this.setState({
      region: region,
      gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
    })
  }

  yesUpdate(card) {
    let yes;
    return this.db.ref(
      '/users/' + this.props.userId +
      '/places/' + card.id).once('value')
        .then(snap => {
          yes = snap.val()
            ? (Object.keys(snap.val()).includes('yes')
              ? snap.val().yes + 1 : 1)
            : 1
        })
          .then(() => {
            this.db.ref('users/' + this.props.userId +
              '/places/' + card.id).update({
                id: card.id,
                name: card.name,
                image: card.image,
                reviewInfo: card.reviewInfo,
                yes: yes
              })
          })
  }

  handleNope (card) {
    console.log("card:", card)
    // console.log("nope")
    // console.log('userId:', this.props.userId, 'cardId:', card.venue.id)
    this.noUpdate(card)
  }

  noUpdate(card) {
    let no;
    return this.db.ref(
      '/users/' + this.props.userId +
      '/places/' + card.id).once('value')
        .then(snap => {
          no = snap.val()
            ? (Object.keys(snap.val()).includes('no')
              ? snap.val().no + 1 : 1)
            : 1
        })
          .then(() => {
            this.db.ref('users/' + this.props.userId +
              '/places/' + card.id).update({
                id: card.id,
                name: card.name,
                image: card.image,
                reviewInfo: card.reviewInfo,
                no: no
              })
          })
  }

  fetchVenues(region, lookingFor) {
    // if (!this.shouldFetchVenues(lookingFor)) return;
    const query = this.venuesQuery(region, lookingFor);
    return fetch(`${FOURSQUARE_ENDPOINT}?${query}`)
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
  }

  venuesQuery({ latitude, longitude }, lookingFor) {
    return stringify({
      ll: `${latitude}, ${longitude}`,
      oauth_token: TOKEN,
      v: v,
      section: lookingFor || this.state.lookingFor || 'food',
      limit: 30,
      openNow: 1,
      venuePhotos: 1
    });
  }

  updateUserPlaces() {
    Promise.all(this.state.cards.map(card => {
      let yes = 0;
      let no = 0;
      return this.db.ref(
        'users/' + this.props.userId + 
        '/places/' + card.venue.id).once('value')
        .then(snap => {
          if (snap.val()) {
            yes = snap.val().yes ? snap.val().yes : 0
            no = snap.val().no ? snap.val().no : 0
          }
        })
          .then(() => {
            const photoItem = card.venue.featuredPhotos.items[0];
            this.userPlaces.push({
              id: card.venue.id,
              name: card.venue.name,
              image: photoItem.prefix + photoItem.width + 'x' + photoItem.height + photoItem.suffix,
              reviewInfo: card.tips,
              pref: this.calcPref(yes, no)
            })
          })
    })
    // ).then(() => this.setState({ sortedPlaces : _.sortBy(this.userPlaces, ['pref']) } ))
    ).then(() => this.setState({ sortedPlaces : _.orderBy(this.userPlaces, ['pref'], ['desc']) } ))
    // ).then(() => this.setState({ sortedPlaces : this.userPlaces.sort((a,b) => b['pref']-a['pref']) } ))
  }

  calcPref(yes, no) {
    const yesVal = Math.min(1, 0.1 * yes)
    const noVal = Math.max(-1, -0.1 * no)
    return 1 + yesVal + noVal
  }

  render() {
    return (
      <View style={styles.container}>
      {
        this.state.cards.length
        ?
          <View style={styles.container} >
            <SwipeCards
              cards={this.state.sortedPlaces}
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

}

const styles = StyleSheet.create({
container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})
