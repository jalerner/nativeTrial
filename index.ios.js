/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Welcome from './app/Welcome';
import Tab from './app/Tab';
import Instant from './app/Instant';
import Plan from './app/Plan';
import Schedule from './app/Schedule';

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
 Tab: { screen: Tab },
 Instant: { screen: Instant },
 Plan: { screen: Plan },
 Schedule: {screen: Schedule}

});

AppRegistry.registerComponent('trial', () => trial);
