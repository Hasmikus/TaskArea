import React, {Component} from 'react';
import {Icon} from 'react-fa';
import PropTypes from 'prop-types';

export default class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
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
        this.props.userSignupRequest(this.state, this.props.auth, this.props.db);
        if (this.props.auth.currentUser) {
            this.props.history.push(`/user/${this.props.auth.currentUser.m}`);
        }
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <InputData
                        type='text'
                        name='username'
                        value={this.state.username}
                        onChange={this.onChange}
                        placeholder='Username'
                        icon='user'
                    />
                    <InputData
                        type='text'
                        name='email'
                        value={this.state.email}
                        onChange={this.onChange}
                        placeholder='Email address'
                        icon='envelope'
                    />
                    <InputData
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.onChange}
                        placeholder='Password'
                        icon='unlock-alt'
                    />
                    <InputData
                        type='password'
                        name='passwordConfirmation'
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                        placeholder='Password confirmation'
                        icon='unlock-alt'
                    />

                </div>
                <div className='form-group'>
                    <button className='btn btn-primary btn-lg signup'>
            Create a free account
                    </button>
                    <p>or</p>
                    <button className='btn btn-primary btn-lg google-button'>
            Sign with Google
                    </button>
                </div>
            </form>
        );
    }
}

class InputData extends Component {
    render () {
        return(
            <div className='input-data'>
                <Icon className='input-icon' name={this.props.icon} />
                <input
                    type={this.props.type}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    placeholder={this.props.placeholder}
                    className='form-control'
                />
            </div>
        );
    }
}

InputData.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func,
    auth: PropTypes.object,
    history: PropTypes.object,
    db: PropTypes.object,
}
