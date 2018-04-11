import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TextInput, ScrollView } from 'react-native'
import { observer } from 'mobx-react/native'
import Button from 'react-native-button'
import firebase from 'react-native-firebase';
import ListItem from '../components/ListItem'
import TaskInput from '../components/TaskInput'
import Icon from 'react-native-vector-icons/FontAwesome'

import ApplicationStyles from '../styles'

import userStore from '../stores/user_store'
import taskStore from '../stores/task_store'

@observer
export default class Timeline extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (firebase.auth().currentUser) {
      taskStore.showAllTasks();
    }
  }

  getUserPhoto(user) {
    return Object.entries(userStore.users).filter((userData) => {
      return userData[0] === user;
    })[0][1].photoURL;
  }

  createTask = (task) => {
    taskStore.createTask(task);
  };

  render() {
    return (
      <View style={[styles.container, ApplicationStyles.container]}>
        <ScrollView style={styles.scrollView}>
          <TaskInput createTask={this.createTask} />
          {!!taskStore.tasks && Object.entries(taskStore.tasks).map(taskData => {
            const currentTask = taskData[1];
            const auth = firebase.auth();
            const isTaskNew = currentTask.state === 'new';
            const isTaskInProgress = currentTask.state === 'inProgress';
            const isTaskDone = currentTask.state === 'done';
            const isTaskCloseable = currentTask.owner ===  auth.currentUser.uid
              && (isTaskInProgress || (isTaskNew && currentTask.assignee === auth.currentUser.uid));
            const isTaskAssignable = isTaskNew && currentTask.owner !== auth.currentUser.uid;
            return (
              <View style={{flexDirection: 'row', marginTop: 20}}  key={taskData[0]}>
                <Image
                  style={{width: 50, height: 50, borderRadius: 25, marginRight: -20, zIndex: 10000}}
                  source={{uri: this.getUserPhoto(currentTask.assignee)}}
                />
                <View style={styles.taskContainer}>
                  <Text style={styles.textStyle}>{currentTask.title}</Text>
                  <Text style={styles.textStyle}>{currentTask.description}</Text>
                  <View style={styles.taskToolbar}>
                    {isTaskInProgress && <Icon style={styles.icon} name={'spinner'} size={20} color="white" />}
                    {isTaskDone && <Icon style={styles.icon} name={'check'} size={20} color="white" />}
                    {isTaskAssignable && <Button onPress={() => taskStore.assignTaskToUser(auth.currentUser.uid, taskData[0])}><Icon style={styles.icon} name={'plus'} size={20} color="white" /></Button>}
                    <View style={styles.valueContainer}>
                      <Text style={styles.textStyle}>{`${currentTask.value}$`}</Text>
                    </View>
                  </View>
                </View>
              </View>)
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    marginTop: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  taskContainer: {
    backgroundColor: '#22252C',
    width: 300,
    marginTop: 10,
    borderRadius: 7,
  },
  valueContainer: {
    backgroundColor: '#E14658',
    width: 50,
    borderRadius: 25,
  },
  icon: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  taskToolbar: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  }
});
