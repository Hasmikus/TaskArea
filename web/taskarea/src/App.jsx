import React, { Component } from 'react';
import './App.css';
//import TaskList from './components/TaskList';
import SignupPage from './components/SignupPage';
import SignInPage from './components/SignInPage';
import firebase from 'firebase';

class App extends Component {
  constructor(props) {
      super(props);
       var config = {
           apiKey: "AIzaSyBfPOZwXyTq5Vj7OmKKgqIN9ijJKZGRCEk",
           authDomain: "taskarea-10ebf.firebaseapp.com",
           databaseURL: "https://taskarea-10ebf.firebaseio.com/",
           projectId: "taskarea-10ebf",
           storageBucket: "taskarea-10ebf.appspot.com",
           messagingSenderId: "31706505887"
       };
       firebase.initializeApp(config)
          .database()
          .ref();
  }

  render() {
    return (
      <div id="App">
        <SignupPage db={firebase}/>
      </div>
    );
  }
}

export default App;
