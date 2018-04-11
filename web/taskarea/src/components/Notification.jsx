// Notifications.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {auth} from '../firebase';
import {Icon} from 'react-fa';

import TaskStore from '../stores/TaskStore';
import UserStore from '../stores/UserStore';

@observer
export default class Notification extends Component {
    constructor() {
        super();
        this.state = {
            taskAssigneePhoto: '',
            isNotificationVisible: true,
        }
    }

    componentWillMount() {
        const assigneeUser = Object.entries(UserStore.users).filter((userData) => {
            return userData[0] === this.props.taskData.owner;
        })[0][1];
        this.setState({
            taskAssigneePhoto: assigneeUser.photoURL,
        });
    }

    assignTask = () => {
        TaskStore.assignTaskToUser(auth.currentUser.uid, this.props.taskID);
        this.onClose();
    };

    onClose = () => {
        this.setState({
            isNotificationVisible: false,
        });
    }

    render() {
        const {taskData} = this.props;
        const isTaskAssignable = taskData.state === 'new';
        return (
            <div className='taskContainer notification'>
                <span><img className='reporter' src={this.state.taskAssigneePhoto} /></span>
                <span className='taskContent notificationContent'>
                    <p>{taskData.title}</p>
                    <p>{taskData.description}</p>
                    <span className='left-items'>
                        <button onClick={this.onClose}>
                            <Icon name='times' />
                        </button>
                        {isTaskAssignable && (
                            <button onClick={this.assignTask}>
                                <Icon name='plus' />
                            </button>)
                        }
                    </span>
                    <span className='right-items'>
                        <span>{taskData.deadline}</span>
                        <span className='price'>{`${taskData.value} $`}</span>
                    </span>
                </span>
            </div>
        )
    }
}

Notification.propTypes = {
    taskData: React.PropTypes.object.isRequired,
    taskID: React.PropTypes.number.isRequired,
}