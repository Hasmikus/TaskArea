// TaskList.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from "mobx";

import {auth} from '../firebase';

import Task from './Task';

@observer
export default class TaskList extends Component {
    @observable userManagedTasks = Immutable.List([]);

    render() {
        return (
            <div className='feed'>
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
            </div>
        )
    }
}
