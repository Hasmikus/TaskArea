// SignupPage.jsx

import React, {Component} from 'react';
import '../styles/SignUpPage.scss';
//import Background from '/images/';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/signupActions'

class SignupPage extends Component {

  render() {
    const { userSignupRequest, db} = this.props;
    return (
        <div className="row signupContainer">
          <div className="col-md-4 col-md-offset-4 formContainer">
            <div>
              <SignupForm userSignupRequest={userSignupRequest} db={db}/>
            </div>
          </div>
        </div>
    );
  }
}

SignupPage.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest})(SignupPage);
