import React, {Component} from 'react';
import '../styles/SignUpPage.scss';
import {Icon} from 'react-fa'

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.userSignInRequest(this.state, this.props.db);
  }
  render() {
    let iconUser = <Icon name="user" />
    let email    = <Icon name="envelope" />
    let password = <Icon name="unlock-alt" />
    return (
      <div>
         <p>TaskArea</p>
         <form onSubmit={this.onSubmit}>
           <div className="form-group">
             <InputData
               type="text"
               name="username"
               value={this.state.username}
               onChange={this.onChange}
               placeholder="Username or email address"
               icon="user"
             />
             <InputData
               type="password"
               name="password"
               value={this.state.password}
               onChange={this.onChange}
               placeholder="Password"
               icon="unlock-alt"
             />
           </div>
           <div className="form-group">
             <button className="btn btn-primary btn-lg signup">
               Let me in
             </button>
             <p>or</p>
             <button className="btn btn-primary btn-lg google-button">
               Sign with Google
             </button>
          </div>
         </form>
      </div>
    );
  }
}

class InputData extends Component {
    render() {
        return(
          <div className="input-data">
              <Icon className="input-icon" name={this.props.icon} />
              <input
                type={this.props.type}
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}
                className="form-control"
              />
          </div>
        );
    }
}

SignInForm.propTypes = {
    userSignInRequest: React.PropTypes.func.isRequired
}
export default SignInForm;
