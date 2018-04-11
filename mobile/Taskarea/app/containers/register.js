import React, { Component, PropTypes } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Button from 'react-native-button'
import { observer } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ApplicationStyles from '../styles'

import userStore from '../stores/user_store'

@observer
export default class Register extends Component {
  static navigationOptions = {
    tabBarVisible: false,
    title: 'Register',
  };

  render() {
    return (
      <View style={[styles.container, ApplicationStyles.container]}>
        <Icon style={styles.welcome} name='building' size={30}></Icon>
        <Text style={styles.text}>
          Counter Container Test
        </Text>
        <Button onPress={ ()=> this.props.navigation.goBack() }>
          Back
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
    marginTop: 100,
    marginBottom: 20,
  },
  text: {
    margin: 10
  },
  textRed: {
    color: 'red',
  },
});
