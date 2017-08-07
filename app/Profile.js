import React, { Component } from 'react';

import * as firebase from 'firebase';
import { firebaseApp } from './Welcome';
import { Container, Header, Content, List, ListItem, Text, Card, CardItem, Icon, Right} from 'native-base';
export default class ListDividerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shared: null,
      past: null
    }
    this.db = firebaseApp.database()
  }

  componentDidMount() {
    const userId = this.props.userId
    this.db.ref('users/' + userId +
      '/schedule/' + 'shared/')
        .once('value')
        .then(snap => { this.setState({shared: snap.val()})})

    this.db.ref('users/' + userId +
      '/schedule/')
        .once('value')
        .then(snap => { this.setState({past: snap.val()})})
  }

  render() {
    console.log(this.state.shared)
    const dbProps = this.state.shared ? Object.keys(this.state.shared) : null
    const dayProps = this.state.past ? Object.keys(this.state.past) : null
    if(dayProps) dayProps.splice(-1)
    console.log(dayProps)
    return (
      <Container>
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>Past Plans</Text>
            </ListItem>
            <ListItem >
              <Content>
                {dayProps && dayProps.map(plan => {
                  return (
                      <Card key={plan}>
                        <CardItem header>
                          <Text>Day</Text>
                          <Right>
                              <Icon name="arrow-forward" />
                          </Right>
                        </CardItem>
                        {
                          this.state.past[plan].scheduleInfo.map(placeObject => {
                            return (
                                      <CardItem key={placeObject.venue.id}>
                                        <Icon active name="ios-pin" />
                                        <Text>{placeObject.venue.name}</Text>
                                      </CardItem>
                                    )
                          })
                        }
                    </Card>
                    )
                })
                }
              </Content>
            </ListItem>
            <ListItem itemDivider>
              <Text>Shared with Me</Text>
            </ListItem>
            <ListItem>
              <Content>
                {dbProps && dbProps.map(plan => {
                  return(
                    <Card key={plan}>
                    <CardItem header>
                      <Text>Day</Text>
                      <Right>
                          <Icon name="arrow-forward" />
                      </Right>
                    </CardItem>
                      {this.state.shared[plan].map(placeObject => {
                        return (
                                  <CardItem key={placeObject.venue.id}>
                                    <Icon active name="ios-pin" />
                                    <Text>{placeObject.venue.name}</Text>
                                  </CardItem>
                                )
                      })
                    }
                    </Card>
                  )
                })}
              </Content>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
