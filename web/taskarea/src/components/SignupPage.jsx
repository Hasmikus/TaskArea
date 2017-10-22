// SignupPage.jsx

import React, {Component} from 'react';
import '../styles/SignUpPage.scss';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupActions';
import {auth, db} from '../firebase';

class SignupPage extends Component {

    render () {
        return (
            <div className='row signupContainer'>
                <div className='col-md-4 col-md-offset-4 formContainer'>
                    <div>
                        <SignupForm userSignupRequest={userSignupRequest} auth={auth} db={db} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {userSignupRequest})(SignupPage);
