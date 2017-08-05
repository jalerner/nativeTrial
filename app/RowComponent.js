
import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, TouchableHighlight, View, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item } from "native-base";
const pickerItem = Picker.pickerItem;
import SortableListView from 'react-native-sortable-listview';


export default class RowComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableHighlight>
        <Text>AHHHH</Text>
      </TouchableHighlight>
    )
  }
}

        // {...this.props.sortHandlers}
