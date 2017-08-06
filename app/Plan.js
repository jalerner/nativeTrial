
import React, { Component } from "react";
import { Platform, StyleSheet } from "react-native";
import { Container, TouchableHighlight, View, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item } from "native-base";
const pickerItem = Picker.pickerItem;
import SortableListView from 'react-native-sortable-listview';
import Row from './Row';
import { StackNavigator } from 'react-navigation';



export default class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      data: {},
      order: [],
      catIds: {
        Food: "4d4b7105d754a06374d81259",
        Entertainment: "4d4b7104d754a06370d81259",
        Dessert: "4bf58dd8d48988d1d0941735",
        Social: "4d4b7105d754a06376d81259",
      }
    }
    this.onValueChange.bind(this);
    this.deleteRow = this.deleteRow.bind(this)
  }
  onValueChange(value) {
    const data = this.state.data;
    data[value] = {text:value}

    this.setState({
      data,
      order: this.state.order.concat(value)
    });
  }

  deleteRow(key){
    let currentData = this.state.data
    delete currentData[key]
    this.setState({data: currentData, order: Object.keys(currentData)})
  }

  render() {
    console.log(this.state.order)
    const catIdArr = this.state.order.map(item => {
      return this.state.catIds[item]
    })
    const { navigate } = this.props
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
              <pickerItem label="Food" value="Food" />
              <pickerItem label="Entertainment" value="Entertainment" />
              <pickerItem label="Dessert" value="Dessert" />
              <pickerItem label="Social" value="Social" />
            </Picker>
          </Form>
        </Content>
        <SortableListView
          style={{ flex: 1 }}
          data={this.state.data}
          order={this.state.order}
          onRowMoved={e => {
            this.state.order.splice(e.to, 0, this.state.order.splice(e.from, 1)[0])
            this.forceUpdate()
          }}
          renderRow={row => <Row data={row} deleteMe={this.deleteRow}/>}
        />
        {this.state.order.length ?
          <Button disabled={false} onPress={() => navigate('Schedule', {category: catIdArr})} style={styles.go}rounded iconRight dark>
            <Text>Seek</Text>
            <Icon name='arrow-forward' />
          </Button>
          :
          <Button disabled style={styles.goDisabled}rounded iconRight dark>
            <Text>Seek</Text>
            <Icon name='arrow-forward' />
          </Button>
        }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
go: {
    position: 'absolute',
    bottom: 60,
    right: 40
  },
goDisabled: {
    position: 'absolute',
    bottom: 60,
    right: 40,
    backgroundColor: 'grey'
  }
})


