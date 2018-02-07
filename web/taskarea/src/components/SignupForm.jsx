import React, {Component} from 'react';
import {Icon} from 'react-fa';
import PropTypes from 'prop-types';

import M from '../messages/en.messages';


import {db} from '../firebase';

export default class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            error: null
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
        this.props.userSignupRequest(this.state, this.props.auth, this.props.db)
            .then((user) => {
                if (this.props.auth.currentUser && user) {
                    db.ref(`users/${user.uid}`).set({
                        name: user.username,
                        photoURL: user.photoURL,
                        email: user.email
                    });
                    this.props.history.push(`/user/${this.props.auth.currentUser.uid}`);
                }
            })
            .catch((error) => {
                this.setState({error: error.message});
            });
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
                        placeholder={M.username}
                        icon='user'
                    />
                    <InputData
                        type='text'
                        name='email'
                        value={this.state.email}
                        onChange={this.onChange}
                        placeholder={M.email}
                        icon='envelope'
                    />
                    <InputData
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.onChange}
                        placeholder={M.password}
                        icon='unlock-alt'
                    />
                    <InputData
                        type='password'
                        name='passwordConfirmation'
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                        placeholder={M.passwordConfirm}
                        icon='unlock-alt'
                    />
                </div>
                {this.state.error && this.state.error.length && <span>
                    <Icon name='warning' />
                    {this.state.error}
                </span>}
                <div className='form-group'>
                    <button className='btn btn-primary btn-lg signup'>
                        {M.signUpByEmail}
                    </button>
                    <p>or</p>
                    <button className='btn btn-primary btn-lg google-button'>
                        {M.signWithGoogle}
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
