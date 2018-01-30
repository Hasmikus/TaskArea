import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Icon} from 'react-fa';
import PropTypes from 'prop-types';

import UserStore from '../stores/UserStore';

import M from '../messages/en.messages';

@observer
export default class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: null
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        UserStore.userSignInRequest(this.state, this.props.auth)
            .then((data) => {
                if (!data) {
                    const currentUser = this.props.auth.currentUser;
                    this.props.history.push(`/user/${currentUser.uid}`);
                } else {
                    this.setState({error: data.error});
                }
            });
    }

    render() {
        return (
            <div>
                <p>TaskArea</p>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <InputData
                            type='text'
                            name='email'
                            value={this.state.email}
                            onChange={this.onChange}
                            placeholder={M.usernameOrEmail}
                            icon='user'
                        />
                        <InputData
                            type='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.onChange}
                            placeholder={M.password}
                            icon='unlock-alt'
                        />
                    </div>
                    {this.state.error && this.state.error.length && <span>
                        <Icon name='warning' />
                        {this.state.error}
                    </span>}
                    <div className='form-group'>
                        <button className='btn btn-primary btn-lg signup'>{M.signInByEmail}</button>
                        <p>or</p>
                        <button className='btn btn-primary btn-lg google-button'>{M.signWithGoogle}</button>
                    </div>
                </form>
            </div>
        );
    }
};

class InputData extends Component {
    render () {
        return (
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
};

InputData.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
}

SignInForm.propTypes = {
    userSignInRequest: PropTypes.func,
    auth: PropTypes.object,
    history: PropTypes.object,
}
