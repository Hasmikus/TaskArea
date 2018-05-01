import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react/native'
import firebase from 'react-native-firebase';

import ApplicationStyles from '../styles'

import Icon from 'react-native-vector-icons/FontAwesome'
import { Text, View, StyleSheet } from 'react-native'
import Button from 'react-native-button'
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../components/CustomInput'

import userStore from '../stores/user_store'

@observer
export default class Register extends Component {
  static navigationOptions = {
    tabBarVisible: false,
    title: 'Register',
  };

  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      error: null,
    }
  }

  setData = (key, value) => {
    this.setState({[key.replace(/ /g,'')]: value});
  };

  singUp = () => {
    const { email, password, username, passwordConfirmation } = this.state;
    if (passwordConfirmation !== password) {
      this.setState({error: "Passwords don't match! Try again"});
    }
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then((user) => {
        userStore.setCurrentUser(user);
        this.props.navigation.navigate('Timeline');
      })
      .catch(error => this.setState({ error: error.message }));
  };

  render() {
    return (
      <View style={[styles.container, ApplicationStyles.container]}>
        <LinearGradient colors={['#494E6B', '#221A45', '#192231']} style={styles.linearGradient}>
          <Text style={styles.textStyle}>
            Register in TaskArea
          </Text>
          <CustomInput name="Username" setData={this.setData} iconName="user" />
          <CustomInput
            name="Email"
            setData={this.setData}
            iconName="envelope" />
          <CustomInput
            name="Password"
            setData={this.setData}
            iconName="unlock-alt"
            isPassword={true} />
          <CustomInput
            name="Password Confirmation"
            setData={this.setData}
            iconName="unlock-alt"
            isPassword={true} />
          <Button style={styles.buttonStyle} onPress={this.singUp}>
            Register
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
