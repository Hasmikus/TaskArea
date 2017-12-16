// SignInPage.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from "mobx";
import PropTypes from 'prop-types';

import SignInForm from './SignInForm';

import {auth} from '../firebase';
import UserStore from '../stores/UserStore';

@observer
export default class SignInPage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className='row signupContainer'>
                <div className='col-md-4 col-md-offset-4 formContainer'>
                    <div>
                        <SignInForm
                            auth={auth}
                            history={this.props.history} />
                    </div>
                </div>
            </div>
        );
    }
};

SignInPage.propTypes = {
    history: PropTypes.object,
}
