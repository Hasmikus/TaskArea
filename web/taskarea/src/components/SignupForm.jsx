import React, {Component} from 'react';
import '../styles/SignUpPage.scss';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit(e) {
    if (this.state.passwordConfirmation !== this.state.password) {
      console.log("Passwords don't match! Try again");
      return;
    }
    e.preventDefault();
    this.props.userSignupRequest(this.state, this.props.db);
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="Username"
            className="form-control formInput"
          />
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="Email address"
            className="form-control formInput"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            className="form-control formInput"
          />
          <input
            type="password"
            name="passwordConfirmation"
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            placeholder="Password confirmation"
            className="form-control formInput"
          />

        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-lg signup">
            Create a free account
          </button>
          <p>or</p>
          <button className="btn btn-primary btn-lg google-button">
            Sign with Google
          </button>
       </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
}
export default SignupForm;
