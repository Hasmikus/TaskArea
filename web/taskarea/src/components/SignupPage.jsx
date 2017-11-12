// SignupPage.jsx
import React, {Component} from 'react';
import {observer} from "mobx-react";

import SignupForm from './SignupForm';
import {auth, db} from '../firebase';
import UserStore from '../stores/UserStore';
import PropTypes from 'prop-types';

@observer
export default class SignupPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='row signupContainer'>
                <div className='col-md-4 col-md-offset-4 formContainer'>
                    <div>
                        <SignupForm
                            userSignupRequest={UserStore.userSignupRequest}
                            auth={auth}
                            db={db}
                            history={this.props.history} />
                    </div>
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
    history: PropTypes.object,
}
