
import React, { Component } from 'react';
import Instant from './Instant';
import Plan from './Plan';
import Profile from './Profile';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Image
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class Tab extends Component {

  constructor(props) { // necessar...?
    super(props)
    this.state = {
      selectedTab: 'Instant'
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const userId = this.props.navigation.state.params.userId
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        unselectedItemTintColor='black'
        tintColor='red'
      >
        <MaterialCommunity.TabBarItem
          selected={this.state.selectedTab === 'Instant'}
          title="Instant"
          iconName="fire"
          onPress={() => this.setState({selectedTab: 'Instant'})}
          >
          <Instant userId={ userId }/>
        </MaterialCommunity.TabBarItem>
        <Ionicons.TabBarItem
          selected={this.state.selectedTab === 'Plan'}
          title="Gameplan"
          iconName="md-list"
          onPress={() => this.setState({selectedTab: 'Plan'})}
          >
          <Plan navigate={navigate} userId={ userId }/>
        </Ionicons.TabBarItem>
        <FontAwesome.TabBarItem
          selected={this.state.selectedTab === 'Favs'}
          title="Me"
          iconName="user"
          onPress={() => this.setState({selectedTab: 'Favs'})}
          >
          <Profile navigate={navigate} userId={ userId }/>
        </FontAwesome.TabBarItem>
      </TabBarIOS>
    )
  }

}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
    color: 'rgba(192, 57, 43, .97)'
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});
