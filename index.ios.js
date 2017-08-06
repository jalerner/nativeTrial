/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Welcome from './app/Welcome';
import Tab from './app/Tab';
import Instant2 from './app/Instant2';
import Plan from './app/Plan';
import * as firebase from 'firebase';

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
 Instant2: { screen: Instant2 },
 Plan: { screen: Plan },
 
});

AppRegistry.registerComponent('trial', () => trial);
