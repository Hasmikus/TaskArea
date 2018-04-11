import React, { Component} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Button from 'react-native-button'
import LinearGradient from 'react-native-linear-gradient';
import { observer } from 'mobx-react/native'
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome'
import ApplicationStyles from '../styles'

import userStore from '../stores/user_store'

@observer
export default class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    const config = {
    apiKey: "AIzaSyBfPOZwXyTq5Vj7OmKKgqIN9ijJKZGRCEk",
    appId: "1:31706505887:android:541169c191ed91e6",
    authDomain: "taskarea-10ebf.firebaseapp.com",
    databaseURL: "https://taskarea-10ebf.firebaseio.com/",
    projectId: "taskarea-10ebf",
    storageBucket: "taskarea-10ebf.appspot.com",
    messagingSenderId: "31706505887",
    };
    firebase.initializeApp(config);
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
    firebase.database().ref("users/").on("value", (snapshot) => {
        userStore.setUsers(snapshot.val());
    }, (errorObject) => {
        console.log("The read failed: " + errorObject.code);
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return (
      <View style={[styles.container, ApplicationStyles.container]}>
          <LinearGradient colors={['#192231', '#221A45', '#494E6B']} style={styles.linearGradient}>
              <Text style={styles.header}>
                  TaskArea
              </Text>
              <Text style={styles.textStyle}>
                  Manage your tasks with us
              </Text>
              <Button style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Login')}>
                Sign In
              </Button>
              <Button style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Register')}>
                Sign Up
              </Button>
          </LinearGradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  header: {
    fontFamily: 'Gill Sans',
    fontStyle: 'italic',
    fontSize: 32,
    textAlign: 'center',
    color: 'white',
    opacity: 0.8
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'white',
    backgroundColor: 'transparent',
  },
  buttonStyle: {
    fontStyle: 'italic',
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