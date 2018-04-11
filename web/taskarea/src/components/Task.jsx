// Task.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Icon} from 'react-fa';

import {auth} from '../firebase';
import TaskStore from '../stores/TaskStore';
import UserStore from '../stores/UserStore';

@observer
export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTask: this.props.taskData,
            taskAssigneePhoto: '',
        }
    }

    componentWillMount() {
        const assigneeUser = Object.entries(UserStore.users).filter((userData) => {
            return userData[0] === this.props.taskData.assignee;
        })[0][1];
        this.setState({
            taskAssigneePhoto: assigneeUser.photoURL,
            currentTask: this.props.taskData,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({currentTask: nextProps.taskData});
    }

    closeTask = () => {
        TaskStore.closeTask(this.props.taskID);
    };

    assignTask = () => {
        TaskStore.assignTaskToUser(auth.currentUser.uid, this.props.taskID);
    };

    render() {
        const {taskData} = this.props;
        const {currentTask} = this.state;
        const isTaskNew = currentTask.state === 'new';
        const isTaskInProgress = currentTask.state === 'inProgress';
        const isTaskDone = currentTask.state === 'done';
        const isTaskCloseable = currentTask.owner ===  auth.currentUser.uid
            && (isTaskInProgress || (isTaskNew && currentTask.assignee === auth.currentUser.uid));
        const isTaskAssignable = isTaskNew && currentTask.owner !== auth.currentUser.uid;

        return (
            <div className='taskContainer'>
                <img className='reporter' src={this.state.taskAssigneePhoto} />
                <div className='taskContent'>
                    <p>{taskData.title}</p>
                    <p>{taskData.description}</p>
                    <span className='left-items'>
                        {isTaskCloseable && (<button onClick={this.closeTask}>
                            <Icon name='times' />
                        </button>)}
                        {isTaskInProgress && (
                            <button>
                                <Icon name='spinner' />
                            </button>)
                        }
                        {isTaskDone && (
                            <button>
                                <Icon name='check' />
                            </button>)
                        }
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
                </div>
            </div>
        )
    }

}

Task.propTypes = {
    taskData: React.PropTypes.object.isRequired,
    taskID: React.PropTypes.string.isRequired,
}
