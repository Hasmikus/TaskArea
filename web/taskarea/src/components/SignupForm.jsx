import React, {Component} from 'react';

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
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1> Join our community!</h1>

        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            className="form-control"
          />
          <label className="control-label">Email</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            className="form-control"
          />
          <label className="control-label">Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            className="form-control"
          />
          <label className="control-label">Password Confirmation</label>
          <input
            type="password"
            name="passwordConfirmation"
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
            className="form-control"
          />

        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-lg">
            Sign Up
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
