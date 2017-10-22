// SignInPage.jsx

import React, {Component} from 'react';
import '../styles/SignUpPage.scss';
import SignInForm from './SignInForm';
import { connect } from 'react-redux';
import { userSignInRequest } from '../actions/signupActions'
import {auth, db} from '../firebase';

class SignInPage extends Component {

    render () {
        return (
            <div className='row signupContainer'>
                <div className='col-md-4 col-md-offset-4 formContainer'>
                    <div>
                        <SignInForm userSignInRequest={userSignInRequest} auth={auth} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {userSignInRequest})(SignInPage);
