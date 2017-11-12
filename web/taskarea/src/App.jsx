import React, {Component} from 'react';
import {Route, Router} from 'react-router-dom';

import SignupPage from './components/SignupPage';
import SignInPage from './components/SignInPage';
import EnterScreen from './components/EnterScreen';
import Timeline from './components/Timeline';

import TaskStore from './stores/TaskStore';
import UserStore from './stores/UserStore';
import './App.css';

import { Provider } from 'mobx-react';
import history from './history';

const stores = {
    TaskStore,
    UserStore,
};

class App extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Provider {...stores}>
                <Router history={history}>
                    <div>
                        <Route exact path='/' component={EnterScreen} store={TaskStore} />
                        <Route path='/signup' component={SignupPage} />
                        <Route path='/signin' component={SignInPage} />
                        <Route path='/user/:uid' component={Timeline} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
