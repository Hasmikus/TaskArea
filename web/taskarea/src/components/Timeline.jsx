// Timeline.jsx
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {observable} from "mobx";
import {Nav, NavItem} from 'react-bootstrap'

import {auth} from '../firebase';

@observer
export default class Timeline extends Component {
    @observable userRating = 8;

    render() {
        let stars = [];
        for (let i = 0; i <  this.userRating; ++i) {
            stars.push(<span className='fa fa-star-o ratingStar' key={i} />);
        }

        return (
            <div className='profile'>
                <div className='menu-container'>
                    <Nav bsStyle='pills' stacked activeKey={1}>
                        <NavItem className='navSection' eventKey={2} disabled>
                            <img src={auth.currentUser.photoURL} className='profilePicture' />
                        </NavItem>
                        <NavItem className='navSection' eventKey={3} disabled>

                            {auth.currentUser.displayName}
                        </NavItem>
                        <NavItem className='navSection' eventKey={4} disabled>
                            {stars}
                        </NavItem>
                        <NavItem className='navSection' eventKey={5}>
                            <i className='fa fa-bars' aria-hidden='true' />
                            My tasks
                        </NavItem>
                        <NavItem className='navSection' eventKey={6}>
                            <i className='fa fa-bars' aria-hidden='true' />
                            New feed
                        </NavItem>
                        <NavItem className='navSection' eventKey={7}>
                            <i className='fa fa-bars' aria-hidden='true' />
                            Create task
                        </NavItem>
                    </Nav>
                </div>
            </div>
        )
    }
};
