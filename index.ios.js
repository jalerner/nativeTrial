/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Instant from './app/Instant';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

const trial = StackNavigator({
 Instant: { screen: Instant }
});

AppRegistry.registerComponent('trial', () => trial);
