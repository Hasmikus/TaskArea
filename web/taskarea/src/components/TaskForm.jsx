// TaskForm.jsx
import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
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
            state: ''
        }
    }

    createTask = () => {
        const taskData = this.state;
        taskData.deadline = taskData.deadline.toString();
        TaskStore.createTask(taskData);
    }

    setTaskField = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    setDeadline = (date) => {
        console.log(date);
        this.setState({
            deadline: date
        });
    }

    render() {
        return (
            <div className='form-container'>
                <input name='title' value={this.state.title} className='form-control' placeholder={M.taskTitle} onChange={(e) => this.setTaskField(e)} />

                <input name='description' value={this.state.description} className='form-control' placeholder={M.description}
                onChange={(e) => this.setTaskField(e)} />

                <span className='splittedRowChange'>
                    <input name='value' value={this.state.value} className='form-control task-value' placeholder={M.taskValue}
                    onChange={(e) => this.setTaskField(e)} />

                    <DatePicker dateFormat='YYYY/MM/DD'
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
