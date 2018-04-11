import React, { Component } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'react-native-button'

import ApplicationStyles from '../styles'

export default class TaskInput extends Component {
  constructor() {
    super();
    this.state = {
      owner: '',
      assignee: '',
      title: '',
      description: '',
      value: '',
      deadline: null,
      state: ''
    }
  }

  setTaskContent = (content) => {
    this.setState({description: content});
  };

  setTaskValue = (content) => {
    this.setState({value: content});
  };

  render() {
    return (
      <View style={[styles.container]}>
        <TextInput
          style={styles.input}
          placeholder={'Type here your new task'}
          placeholderTextColor="#C7C7CD"
          onChangeText={this.setTaskContent}
          underlineColorAndroid="transparent"
        />
        <View style={styles.taskToolbar}>
          <TextInput
            style={styles.value}
            keyboardType={'numeric'}
            placeholder={'Task value'}
            placeholderTextColor="#C7C7CD"
            onChangeText={this.setTaskValue}
            underlineColorAndroid="transparent"
          />
          <Button style={styles.button} onPress={() => this.props.createTask(this.state)}>
            Create task
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#22252C',
    marginLeft: 25,
    borderRadius: 7,
    height: 100,
    width: 300,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    flexDirection:'row',
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 3,
    backgroundColor: 'white',
    borderRadius: 7,
    color: 'black',
    width: 270,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#d86371',
    borderRadius: 3,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
    fontSize: 12,
  },
  value: {
    width: 70,
    borderRadius: 3,
    borderColor: 'white',
    borderBottomWidth: 0.5,
    color: 'white',
    paddingHorizontal: 5,
    paddingVertical: 4,
    marginRight: 10,
    marginBottom: 2,
    fontSize: 12,
  },
  taskToolbar: {
    flex: 1,
    width: 270,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    marginBottom: 5,
  }
});
