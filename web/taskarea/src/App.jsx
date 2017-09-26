import React, { Component } from 'react';
import './App.css';
//import TaskList from './components/TaskList';
import EnterScreen from './components/EnterScreen';
import SignupPage from './components/SignupPage';
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
       firebase.initializeApp(config); 
  }

  render() {
    return (
      <div id="App">
        <SignupPage />
         {/*<EnterScreen/>*/}
      </div>
    );
  }
}

export default App;
