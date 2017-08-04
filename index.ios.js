/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Welcome from './app/Welcome';
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
 Welcome: { screen: Welcome },
 Instant: { screen: Instant}
});

AppRegistry.registerComponent('trial', () => trial);
