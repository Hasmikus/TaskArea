// Task.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Icon} from 'react-fa';
import PropTypes from 'prop-types';

import M from '../messages/en.messages';

import {auth} from '../firebase';
import TaskStore from '../stores/TaskStore';

@observer
export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTask: this.props.taskData
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({currentTask: nextProps.taskData});
    }

    componentWillMount() {
        this.setState({currentTask: this.props.taskData});
    }

    onClick = (e) => {
        console.log('55');
    };

    closeTask = () => {
        TaskStore.closeTask(this.props.taskID);
    };

    assignTask = () => {
        TaskStore.assignTaskToUser(auth.currentUser.uid, this.props.taskID);
    };

    render() {
        const {taskData, taskID} = this.props;
        const {currentTask} = this.state;
        const isTaskNew = currentTask.state === 'new';
        const isTaskInProgress = currentTask.state === 'inProgress';
        const isTaskDone = currentTask.state === 'done';
        const isTaskCloseable = currentTask.owner ===  auth.currentUser.uid
            && (isTaskInProgress || (isTaskNew && currentTask.assignee === auth.currentUser.uid));
        const isTaskAssignable = currentTask.state === 'new';

        return (
            <div className='taskContainer'>
                <img className='reporter' />
                <div className='taskContent'>
                    <p>{taskData.title}</p>
                    <p>{taskData.description}</p>
                    <span className='left-items'>
                        {isTaskCloseable && (<button onClick={this.onClick}>
                            <Icon name='times' />
                        </button>)}
                        {isTaskInProgress && (
                            <button onClick={this.onClick}>
                               <Icon name='spinner' />
                            </button>)
                        }
                        {isTaskDone && (
                            <button onClick={this.onClick}>
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
    taskData: PropTypes.object.isRequired,
}
