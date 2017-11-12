// EnterScreen.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap'

import {auth} from '../firebase';
import UserStore from '../stores/UserStore';

@observer
export default class EnterScreen extends Component {
    render() {
        return (
            <div className='enterScreen'>
                <span className='buttonGroup'>
                   <Button bsSize='large' className='topButton'>Get started</Button>
                    <Link to='/signup'>
                        <Button bsSize='large' className='topButton signUpButton'>
                            Sign Up
                        </Button>
                    </Link>
                    <Link to={auth.currentUser ? `/user/${auth.currentUser.displayName}` : '/signin'}>
                        <Button bsSize='large' className='topButton signInButton'>
                            Sign In
                        </Button>
                    </Link>
                </span>
                <div className='div1' />
                <div className='div2' />
                <div className='header'>
                    <p>MANAGING YOUR TASKS TOGETHER</p>
                </div>
                <div className='div3' />
                <div className='div4' />
            </div>
        )
    }
};
