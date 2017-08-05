
import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, TouchableHighlight, View, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item } from "native-base";
const pickerItem = Picker.pickerItem;
import SortableListView from 'react-native-sortable-listview';
import RowComponent from './RowComponent';
import Test from './Test';

let data = {
  hello: { text: 'world' },
  how: { text: 'are you' },
  test: { text: 123 },
  this: { text: 'is' },
  a: { text: 'a' },
  real: { text: 'real' },
  drag: { text: 'drag and drop' },
  bb: { text: 'bb' },
  cc: { text: 'cc' },
  dd: { text: 'dd' },
  ee: { text: 'ee' },
  ff: { text: 'ff' },
  gg: { text: 'gg' },
  hh: { text: 'hh' },
  ii: { text: 'ii' },
  jj: { text: 'jj' },
  kk: { text: 'kk' },
}

let order = Object.keys(data) //Array of keys

export default class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    }
    this.onValueChange.bind(this);
  }
  onValueChange(value) {
    this.setState({
      selected2: value
    });
  }
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Picker
              mode="dropdown"
              placeholder="Choose Your Weapon of Choice"
              selectedValue={this.state.selected2}
              onValueChange={
                this.onValueChange.bind(this)
              }
            >
              <pickerItem label="Wallet" value="key0" />
              <pickerItem label="ATM Card" value="key1" />
              <pickerItem label="Debit Card" value="key2" />
              <pickerItem label="Credit Card" value="key3" />
              <pickerItem label="Net Banking" value="key4" />
            </Picker>
          </Form>
        </Content>
          <SortableListView
          style={{ flex: 1 }}
          data={data}
          order={order}
          onRowMoved={e => {
            order.splice(e.to, 0, order.splice(e.from, 1)[0])
            this.forceUpdate()
          }}
          renderRow={row => <Test data={row} />}
        />
      </Container>
    );
  }
}

