
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Picker
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class Plan extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: 'Arts & Entertainment',
      categories: [
        { showUser: 'Arts & Entertainment', url: '4d4b7104d754a06370d81259' },
        { showUser: 'College & University', url: '4d4b7105d754a06372d81259' },
        { showUser: 'Event', url: '4d4b7105d754a06373d81259' },
        { showUser: 'Food', url: '4d4b7105d754a06374d81259' },
        { showUser: 'Nightlife Spot', url: '4d4b7105d754a06376d81259' },
        { showUser: 'Outdoors & Recreation', url: '4d4b7105d754a06377d81259' },
        { showUser: 'Professional & Other Places', url: '4d4b7105d754a06375d81259' },
        { showUser: 'Residence', url: '4e67e38e036454776db1fb3a' },
        { showUser: 'Shop & Service', url: '4d4b7105d754a06378d81259' },
        { showUser: 'Travel & Transport', url: '4d4b7105d754a06379d81259' },
      ]
    }
  }

  renderItem() {
    let items = [];
    this.state.categories.forEach(category => {
      items.push(<Picker.Item
        label={category.showUser}
        value={category.showUser}
        key={category.url}
      />)
    })
    return items;
  }

  render() {

    return (
      <View>
        <Picker
          selectedValue={this.state.selected}
          onValueChange={(itemValue) => this.setState({selected: itemValue})}>
            {this.renderItem()}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(192, 57, 43, 1)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeImage: {
    resizeMode: 'contain',
    width: 200,
    height: 150
  },
  logoImage: {
    resizeMode: 'contain',
    width: 100
  },
  login: {
    marginTop: 100,
  }
});

