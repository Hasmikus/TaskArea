// TaskList.jsx

import React, {Component} from 'react';

class TaskList extends Component {
    constructor (props){
        super(props);
        this.state  = {
            tasks: [],
        }
    }
    render (){
        return (
            <div>
        TaskList Component
            </div>
        )
    }
}

export default TaskList
