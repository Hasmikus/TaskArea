// Task.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from "mobx";
import {Icon} from 'react-fa';
import PropTypes from 'prop-types';

import {auth} from '../firebase';

@observer
export default class Task extends Component {
    render() {
        let {task} = this.props;
        return (
            <div className='taskContainer'>
                <img className='reporter' />
                <div className='taskContent'>
                    <p>Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    <span className='left-items'>
                        <Icon name='times-circle-o' />
                        <Icon name='spinner' />
                        <Icon name='check' />
                    </span>
                    <span className='right-items'>
                        <span>23/04/55</span>
                        <span className='price'>{`55 $`}</span>
                    </span>
                </div>
            </div>
        )
    }

}

Task.propTypes = {
    task: PropTypes.object,
}
