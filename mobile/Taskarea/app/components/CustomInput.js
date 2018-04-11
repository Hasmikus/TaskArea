import React, { Component } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import ApplicationStyles from '../styles'

export default class CustomInput extends Component {
  render() {
    const isEmail = this.props.name === 'Email';
    return (
      <View style={[styles.inputSection]}>
        <Icon style={styles.icon} name={this.props.iconName} size={20} color="white" />
        <TextInput
          style={styles.input}
          keyboardType={isEmail ? 'email-address' : 'default'}
          secureTextEntry={this.props.isPassword}
          placeholder={this.props.name}
          placeholderTextColor="white"
          onChangeText={(searchString) => {this.props.setData(this.props.name.toLowerCase(), searchString)}}
          underlineColorAndroid="transparent"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderBottomWidth: 0.5,
    height: 50,
    width: 300,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: 'transparent',
    color: 'white',
  },
});
