import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {firebaseApp, auth, storageKey, isAuthenticated} from './firebase';

import SignupPage from './components/SignupPage';
import SignInPage from './components/SignInPage';
import EnterScreen from './components/EnterScreen';
import Profile from './components/Profile';
import './App.css';

const store = createStore (
  (state = {}) => state,
  applyMiddleware(thunk)
);

class App extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
        <Provider store={store}>
          <Router history={browserHistory}>
              <Route path="/" component={EnterScreen} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/signin" component={SignInPage} />
              <Route path="/user(/:uid)" component={Profile} />
          </Router>
        </Provider>
    );
  }
}

export default App;
