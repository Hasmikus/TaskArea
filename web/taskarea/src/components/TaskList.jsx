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
        if (tasks) {
            return (
                <div className='feed'>
                    {Object.entries(tasks).map(taskData =>{
                        return <Task taskData={taskData[1]} taskID={taskData[0]} />
                    })}
                </div>
            )} else {
            return (<div />);
        }
    }
}

TaskList.propTypes = {
    tasks: React.PropTypes.array,
}

