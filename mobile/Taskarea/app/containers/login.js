import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';
import Button from 'react-native-button'

import ApplicationStyles from '../styles'

import CustomInput from '../components/CustomInput'

import userStore from '../stores/user_store'

export default class Login extends Component {
  static navigationOptions = {
    tabBarVisible: false,
    title: 'Login',
  };

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null
    }
  }

  setData = (key, value) => {
    this.setState({[key]: value});
  };

  logIn = () => {
  const { email, password } = this.state;
  firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
    .then((user) => {
      userStore.setCurrentUser(user);
      this.props.navigation.navigate('Timeline');
      // If we need to do anything with the user, do it here
      // The user will be logged in automatically by the 
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
  };

  render() {
    return (
      <View style={[styles.container, ApplicationStyles.container]}>
        <LinearGradient colors={['#494E6B', '#221A45', '#192231']} style={styles.linearGradient}>
          <Text style={styles.textStyle}>
            Login to TaskArea
          </Text>
          <CustomInput name="Email" setData={this.setData} iconName="user" />
          <CustomInput name="Password" setData={this.setData} iconName="unlock-alt" isPassword={true}/>
          <Button style={styles.buttonStyle} onPress={this.logIn}>
            Log In
          </Button>
        </LinearGradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    color: 'white',
  },
  buttonStyle: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    color: 'white',
    backgroundColor: '#98878F',
    opacity: 2,
    width: 250,
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10
  }
});
