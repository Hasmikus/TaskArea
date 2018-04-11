import React from 'react';
import { DrawerNavigator, StackNavigator, DrawerItems } from 'react-navigation'
import { Text, StyleSheet, Image, ScrollView } from 'react-native';
import Button from 'react-native-button'

import Feather from 'react-native-vector-icons/Feather'

import WelcomeScreen from '../containers/welcome_screen'
import Login from '../containers/login'
import Register from '../containers/register'
import CheckinScreen from '../containers/checkin_screen'
import Timeline from '../containers/timeline'

import firebase from 'react-native-firebase'
import taskStore from '../stores/task_store'

const drawerButton = (navigation) => (
  <Feather
    name="menu"
    size={24}
    color="black"
    style={{ paddingLeft: 20 }}
    onPress={() => navigation.navigate('DrawerToggle')} />
)

const Drawer = DrawerNavigator({
  Timeline: {
  	screen: Timeline,
  	navigationOptions: {
      drawerLabel: 'My Timeline',
    }
  },
  Home: {
    screen: WelcomeScreen,
    navigationOptions: {
      drawerLabel: 'Log Out',
    }
  }
  // TODO
  // Profile: { screen: Profile },
  // NewTask: { screen: CreateTask}
  // LogOut
},  {
  contentComponent: props => 
      <ScrollView>
        <Image
          style={styles.profileImage}
          source={{uri: firebase.auth().currentUser.photoURL}}
        />
        <Text style={styles.userName}>
          {firebase.auth().currentUser.displayName}
        </Text>
        <Button style={styles.menuItem} onPress={() => taskStore.setManagedTasks()}>
          My tasks
        </Button>
        <Button style={styles.menuItem} onPress={() => taskStore.setCurrentTasks()}>
          Assigned tasks
        </Button>
        <Button style={styles.menuItem} onPress={() => taskStore.showAllTasks()}>
          All tasks
        </Button>
        <DrawerItems {...props} />
      </ScrollView>
    
});

const doNotShowHeader = {
  drawerBackgroundColor : '#494E6B',
  navigationOptions: ({ navigation}) => ({
  	headerLeft: drawerButton(navigation),
  })
};

const Stack = StackNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  Login: { screen: Login },
  Register: { screen: Register },
  Timeline: { screen: Drawer, ...doNotShowHeader, }}, {
    headerMode: 'screen',
});

const styles = StyleSheet.create({
  profileImage: {
    width: 50,
    height: 50,
    marginLeft: 30,
    marginTop: 10,
    borderRadius: 25,
  },
  userName: {
    marginLeft: 30,
    paddingTop: 10,
  },
  menuItem: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: 'black'
  },
});

export default Stack;