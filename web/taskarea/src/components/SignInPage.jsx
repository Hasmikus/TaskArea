// SignInPage.jsx

import React, {Component} from 'react';
import '../styles/SignUpPage.scss';
import SignInForm from './SignInForm';
import { connect } from 'react-redux';
import { userSignInRequest } from '../actions/signupActions'

class SignInPage extends Component {

  render() {
    const { userSignupRequest, db} = this.props;
    return (
        <div className="row signupContainer">
          <div className="col-md-4 col-md-offset-4 formContainer">
            <div>
              <SignInForm userSignupRequest={userSignupRequest} db={db}/>
            </div>
          </div>
        </div>
    );
  }
}

SignInPage.propTypes = {
    userSignInRequest: React.PropTypes.func.isRequired
}

export default connect(null, {userSignInRequest})(SignInPage);
