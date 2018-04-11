// EnterScreen.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {auth} from '../firebase';

import M from '../messages/en.messages';

import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap'

@observer
export default class EnterScreen extends Component {
    render() {
        return (
            <div className='enterScreen'>
                <span className='buttonGroup'>
                    <Button bsSize='large' className='topButton'>{M.getStarted}</Button>
                    <Link to='/signup'>
                        <Button bsSize='large' className='topButton signUpButton'>
                            {M.signUp}
                        </Button>
                    </Link>
                    <Link to={auth.currentUser ? `/user/${auth.currentUser.displayName}` : '/signin'}>
                        <Button bsSize='large' className='topButton signInButton'>
                            {M.signIn}
                        </Button>
                    </Link>
                </span>
                <div className='div1' />
                <div className='div2' />
                <div className='header'>
                    <p>{M.homePageTitle}</p>
                </div>
                <div className='div3' />
                <div className='div4' />
            </div>
        )
    }
};
