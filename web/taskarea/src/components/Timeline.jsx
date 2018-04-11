// Timeline.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';

import {auth, db} from '../firebase';

import {Icon} from 'react-fa';
import {Nav, NavItem} from 'react-bootstrap'
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Notifications from './Notifications';
import ProfileEditor from './ProfileEditor';

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
            isProfileEditorShown: false,
            currentUser: auth.currentUser,
            tasksList: [],
            timelineTitle: M.currentTasksTitle,
        };
    }

    componentDidMount() {
        if (this.state.currentUser) {
            db.ref("tasks/").orderByChild("owner")
                .equalTo(this.state.currentUser.uid)
                .on("value", (snapshot) => {
                    TaskStore.setManagedTasks(snapshot.val());
                }, (errorObject) => {
                    console.log("The read failed: " + errorObject.code);
                });
        }

        db.ref("tasks/").on("value", (snapshot) => {
            TaskStore.setCurrentTasks(snapshot.val());
            if (this.state.timelineTitle === M.currentTasksTitle) {
                this.showCurrentTasks();
            }
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
        });

        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({currentUser: user});
                this.showCurrentTasks();
                db.ref("tasks/").orderByChild("owner")
                    .equalTo(user.uid)
                    .on("value", (snapshot) => {
                        TaskStore.setManagedTasks(snapshot.val());
                    }, (errorObject) => {
                        console.log("The read failed: " + errorObject.code);
                    });
            } else {
                this.props.history.push(`/`);
            }
        });
    }

    showManagedTasks = () => {
        console.log(TaskStore.managedTasks);
        this.setState({
            timelineTitle: M.managedTasks,
            tasksList: TaskStore.managedTasks,
            isTasksListShown: true,
            isCreateTaskFormShown: false,
            isProfileEditorShown: false,
        });
    };

    showCurrentTasks = () => {
        this.setState({
            timelineTitle: M.currentTasksTitle,
            tasksList: TaskStore.tasks,
            isTasksListShown: true,
            isCreateTaskFormShown: false,
            isProfileEditorShown: false,
        });
    };

    showCreateTaskForm = () => {
        this.setState({
            timelineTitle: M.newTask,
            isTasksListShown: false,
            isCreateTaskFormShown: true,
            isProfileEditorShown: false,
        });
    };

    showProfilePage = () => {
        this.setState({
            timelineTitle: M.myProfile,
            isTasksListShown: false,
            isCreateTaskFormShown: false,
            isProfileEditorShown: true,
        });
    };

    onTaskCreated = () => {
        this.setState({
            timelineTitle: M.editProfile,
            tasksList: TaskStore.tasks,
            isTasksListShown: true,
            isCreateTaskFormShown: false,
            isProfileEditorShown: false,
        });
    };

    signOut = () => {
        UserStore.signOut(auth);
    };

    render() {
        const {
            currentUser,
            userRating,
            isCreateTaskFormShown,
            isTasksListShown,
            isProfileEditorShown,
            timelineTitle,
            tasksList,
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
                        <NavItem className='navSection' eventKey={3} onSelect={this.showProfilePage}>
                            {currentUser.displayName}
                            <Icon name='pencil' />
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
                        <NavItem className='navSection' eventKey={7} onSelect={this.signOut}>
                            <i className='fa fa-bars' aria-hidden='true' />
                            {M.logOut}
                        </NavItem>
                    </Nav>
                </div>
                <h1 className='title'>{timelineTitle}</h1>
                {isCreateTaskFormShown && <TaskForm currentUserID={auth.currentUser.uid}
                    onTaskCreateCallback={this.onTaskCreated} />}
                {isTasksListShown && tasksList && Object.keys(tasksList).length && <TaskList tasks={tasksList} />}
                {TaskStore.notificationTasks.length && <Notifications />}
                {isProfileEditorShown && <ProfileEditor history={this.props.history} />}
            </div>)};
    }
};

Timeline.propTypes = {
    history: React.PropTypes.object,
}

