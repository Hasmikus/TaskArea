// Notifications.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {auth} from '../firebase';
import Notification from './Notification';

import TaskStore from '../stores/TaskStore';

@observer
export default class Notifications extends Component {
    constructor() {
        super();
        this.state = {
            tasks: TaskStore.notificationTasks,
        }
    }

    render() {
        return (
            <div className='notifications'>
                {this.state.tasks.map(taskData => {
                    if (taskData.owner !== auth.currentUser.uid) {
                        return <Notification taskData={taskData} taskID={taskData.uid} />
                    }
                })}
            </div>
        )
    }
}