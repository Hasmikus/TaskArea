// EnterScreen.jsx

import React, {Component} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap'
import '../styles/EnterScreen.scss';
//import Background from '/images/';

class EnterScreen extends Component {

    render () {
        return (
            <div className='enterScreen'>
                <span className='buttonGroup'>
                    <Button bsSize='large' style={{backgroundColor: '#e27f4d', marginRight: '30px', marginTop: '5px'}}><Link style={{color: 'white'}} to='/signup'>Sign Up</Link></Button>
                    <Button bsSize='large' style={{backgroundColor: '#bf3131', marginRight: '30px', marginTop: '5px'}}><Link style={{color: 'white'}} to='/signin'>Sign In</Link></Button>
                </span>
                <div className='div1' />
                <div className='div2' />

                <div className='header'>
                    <p>MANAGING YOUR TASKS TOGETHER</p>
                    <a href='signUp' className='greenButton'>Get started</a>
                </div>
                <div className='div3' />
                <div className='div4' />
            </div>
        )
    }
}
export default EnterScreen
