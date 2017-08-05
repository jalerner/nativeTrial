
import React, { Component } from "react";
import { Platform, TouchableHighlight } from "react-native";
import { Container, View, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item } from "native-base";
const pickerItem = Picker.pickerItem;
import SortableListView from 'react-native-sortable-listview';

export default class Test extends Component {

  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          padding: 25,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        <Text>{this.props.data.text}</Text>
      </TouchableHighlight>      )
  }

}

