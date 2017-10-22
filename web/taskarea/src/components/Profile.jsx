import React, {Component} from 'react';
import {ButtonGroup, ButtonToolbar, Grid, Col, Row} from 'react-bootstrap';

import '../styles/Profile.scss';

export default class Profile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: {},
        }

    }

    render () {
        return (
            <Grid  className='profile'>
                <Row bsClass='highSection'>TODO profile image section</Row>
                <Row>
                    <ButtonToolbar>
                        <ButtonGroup justified bsSize='large'>
                            <Col xs={12} md={4}>
                                <button type='button' className='btn largeButton'>                         CREATE TASK
                                </button>
                            </Col>
                            <Col xs={12} md={4}>
                                <button type='button' className='btn largeButton'>
                        NEWS FEED
                                </button>
                            </Col>
                            <Col xs={12} md={4}>
                                <button type='button' className='btn largeButton'>
                        MY TASKS
                                </button>
                            </Col>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Row>
            </Grid>
        );
    }
}

