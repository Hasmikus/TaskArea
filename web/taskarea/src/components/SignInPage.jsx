// SignInPage.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';

import SignInForm from './SignInForm';

import {auth} from '../firebase';

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
    history: React.PropTypes.object,
}
