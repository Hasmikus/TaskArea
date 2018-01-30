// Timeline.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {extendObservable} from "mobx";
import {Nav, NavItem} from 'react-bootstrap'

import {auth, db} from '../firebase';

import TaskList from './TaskList';
import TaskForm from './TaskForm';

import UserStore from '../stores/UserStore';
import TaskStore from '../stores/TaskStore';

import M from '../messages/en.messages';

@observer
export default class Timeline extends Component {
    constructor() {
        super();
        this.state = {
            userRating: 8,
            isTasksListShown: true,
            isCreateTaskFormShown: false,
            currentUser: auth.currentUser,
            tasksList: [],
            timelineTitle: M.managedTasks
        };
    }


    componentWillMount() {
        this.showManagedTasks();
    }

    componentDidMount() {
        const loggedUser = auth.currentUser;
        auth.onAuthStateChanged((user) => {
            if (user || loggedUser) {
              this.setState({currentUser: user});
            } else {
              this.props.history.push(`/`);
            }
        });
    }

    showManagedTasks = () => {
        this.setState({
            timelineTitle: M.managedTasks,
            tasksList: TaskStore.managedTasks,
            isTasksListShown: true,
            isCreateTaskFormShown: false
        });
    }

    showCurrentTasks = () => {
        this.setState({
            timelineTitle: M.currentTasksTitle,
            tasksList: TaskStore.tasks,
            isTasksListShown: true,
            isCreateTaskFormShown: false,
        });
    }

    showCreateTaskForm = () => {
        this.setState({
            timelineTitle: M.newTask,
            isTasksListShown: false,
            isCreateTaskFormShown: true,
        });
    }

    signOut = (auth) => {
        UserStore.signOut(auth);
    }

    render() {
        const {
            currentUser,
            userRating,
            isCreateTaskFormShown,
            isTasksListShown,
            timelineTitle,
            tasksList
        } = this.state;
        let stars = [];
        for (let i = 0; i <  userRating; ++i) {
            stars.push(<span className='fa fa-star-o ratingStar' key={i} />);
        }

        if (!currentUser) {
            return (<div />);
        } else {
            return (<div className='profile'>
                <div className='menu-container'>
                    <Nav bsStyle='pills' stacked activeKey={1}>
                        <NavItem className='navSection' eventKey={2} disabled>
                            <img src={currentUser.photoURL} className='profilePicture' />
                        </NavItem>
                        <NavItem className='navSection' eventKey={3} disabled>
                            {currentUser.displayName}
                        </NavItem>
                        <NavItem className='navSection' eventKey={4} disabled>
                            {stars}
                        </NavItem>
                        <NavItem className='navSection' eventKey={5} onSelect={this.showManagedTasks}>
                            <i className='fa fa-bars' aria-hidden='true' />
                            {M.manageTasks}
                        </NavItem>
                        <NavItem className='navSection' eventKey={6} onSelect={this.showCurrentTasks}>
                            <i className='fa fa-bars' aria-hidden='true' />
                            {M.currentTasks}
                        </NavItem>
                        <NavItem className='navSection' eventKey={7} onSelect={this.showCreateTaskForm}>
                            <i className='fa fa-bars' aria-hidden='true' />
                            {M.createTask}
                        </NavItem>
                        <NavItem className='navSection' eventKey={7} onSelect={(e, auth) => this.signOut(auth)}>
                            <i className='fa fa-bars' aria-hidden='true' />
                            {M.logOut}
                        </NavItem>
                    </Nav>
                </div>
                <h1 className='title'>{timelineTitle}</h1>
                {isCreateTaskFormShown && <TaskForm currentUserID={auth.currentUser.uid} />}
                {isTasksListShown && <TaskList tasks={tasksList} />}
            </div>
        )};
    }
};

