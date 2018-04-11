// TaskForm.jsx
import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {observer} from 'mobx-react';
import moment from 'moment'

import M from '../messages/en.messages';

import TaskStore from '../stores/TaskStore';

import 'react-datepicker/dist/react-datepicker.css';

@observer
export default class TaskForm extends Component {
    constructor() {
        super();
        this.state = {
            owner: '',
            assignee: '',
            title: '',
            description: '',
            value: '',
            deadline: moment(),
            state: '',
        }
    }

    createTask = () => {
        const taskData = this.state;
        taskData.deadline = taskData.deadline.format('DD/MM/YYYY');
        TaskStore.createTask(taskData);
        this.props.onTaskCreateCallback();
    }

    setTaskField = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    setDeadline = (date) => {
        this.setState({
            deadline: date,
        });
    }

    render() {
        return (
            <div className='form-container'>
                <input name='title' value={this.state.title}
                    className='form-control'
                    placeholder={M.taskTitle}
                    onChange={this.setTaskField} />

                <input name='description'
                    value={this.state.description}
                    className='form-control'
                    placeholder={M.description}
                    onChange={this.setTaskField} />

                <span className='splittedRowChange'>
                    <input name='value'
                        value={this.state.value}
                        className='form-control task-value'
                        placeholder={M.taskValue}
                        onChange={this.setTaskField} />

                    <DatePicker dateFormat='DD/MM/YYYY'
                        selected={this.state.deadline}
                        onChange={this.setDeadline}
                        name='deadline'
                        className='form-control' />
                </span>
                <button onClick={this.createTask}>{M.publishTask}</button>
            </div>
        )
    }
}

TaskForm.propTypes = {
    onTaskCreateCallback: React.PropTypes.func.isRequired,
}