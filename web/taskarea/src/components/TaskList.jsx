// TaskList.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from "mobx";

import {auth} from '../firebase';

import Task from './Task';

@observer
export default class TaskList extends Component {

    render() {
        const {tasks} = this.props;
        return (
            <div className='feed'>
                {Object.entries(tasks).map(taskData =>{
                    return <Task taskData={taskData[1]} taskID={taskData[0]} />
                })}
            </div>
        )
    }
}

Task.propTypes = {
    tasks: React.PropTypes.array,
}

