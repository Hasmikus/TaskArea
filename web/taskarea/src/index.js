import React from 'react';
import { render } from 'react-dom';
import './index.css';
import './styles/EnterScreen.css'
import './styles/SignUpPage.css';
import App from './App';
import { Router, Route, browserHistory } from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import EnterScreen from './components/EnterScreen';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);
render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={EnterScreen} />
        <Route path="/signup" component={App} />
    </Router>
  </Provider>, document.getElementById('root'));
