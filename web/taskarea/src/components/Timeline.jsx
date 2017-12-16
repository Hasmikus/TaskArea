// Timeline.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from "mobx";
import {Nav, NavItem} from 'react-bootstrap'

import {auth} from '../firebase';

import TaskList from './TaskList';
import UserStore from '../stores/UserStore';

@observer
export default class Timeline extends Component {
    @observable userRating = 8;
    @observable areManagedTasksShown = false;
    @observable areCurrentTasksShown = true;
    @observable isCreateTaskFormShown = false;
    @observable currentUser = auth.currentUser;

    showManagedTasks = () => {
        this.areManagedTasksShown = true;
    }

    showCurrentTasks = () => {
        this.areCurrentTasksShown = true;
    }

    showCreateTaskForm = () => {
        this.isCreateTaskFormShown = true;
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
              this.currentUser = user;
            }
        });
    }

    render() {
        let stars = [];
        for (let i = 0; i <  this.userRating; ++i) {
            stars.push(<span className='fa fa-star-o ratingStar' key={i} />);
        }

        if (!this.currentUser) {
            return (<div />);
        } else {
            return (<div className='profile'>
                <div className='menu-container'>
                    <Nav bsStyle='pills' stacked activeKey={1}>
                        <NavItem className='navSection' eventKey={2} disabled>
                            <img src={this.currentUser.photoURL} className='profilePicture' />
                        </NavItem>
                        <NavItem className='navSection' eventKey={3} disabled>

                            {this.currentUser.displayName}
                        </NavItem>
                        <NavItem className='navSection' eventKey={4} disabled>
                            {stars}
                        </NavItem>
                        <NavItem className='navSection' eventKey={5} onSelect={this.showManagedTasks}>
                            <i className='fa fa-bars' aria-hidden='true' />
                            Manage my tasks
                        </NavItem>
                        <NavItem className='navSection' eventKey={6} onSelect={this.showCurrentTasks}>
                            <i className='fa fa-bars' aria-hidden='true' />
                            Current tasks
                        </NavItem>
                        <NavItem className='navSection' eventKey={7} onSelect={this.showCreateTaskForm}>
                            <i className='fa fa-bars' aria-hidden='true' />
                            Create task
                        </NavItem>
                        <NavItem className='navSection' eventKey={7} onSelect={UserStore.signOut(auth)}>
                            <i className='fa fa-bars' aria-hidden='true' />
                            Log out
                        </NavItem>
                    </Nav>
                </div>
                <TaskList />
            </div>
        )};
    }
};

