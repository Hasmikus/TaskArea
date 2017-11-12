// TaskList.jsx

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {createAutoSubscriber} from 'firebase-nest';
 
import Chance from 'chance';
import slugify from 'slugify';
import TimeAgo from 'react-timeago'
import twitter_text from 'twitter-text';
 
const task_limit = 140;
var ch = new Chance();

class TaskList extends Component {
    constructor (props){
        super(props);
        this.state  = {
            task: {},
            username: slugify(ch.name()),
            loading: false, //whether the Firebase data is currently loading or not
            remaining: task_limit //number of characters allowed for each task
        };
        this.updateTask = this.updateTask.bind(this); 
        this.submitTask = this.submitTask.bind(this);
    }

    renderTask(key, task) {
        return (
          <article className="card" key={key}>
            <header>
              <h5>@{task.username} - <TimeAgo date={task.timestamp} /></h5>
            </header>
            <div className="task" dangerouslySetInnerHTML={{__html: twitter_text.autoLink(twitter_text.htmlEscape(task.text))}}></div>
          </article>
        );
     }

     updateText(evt) {
         let tweet = evt.target.value
         let remaining = tweet_limit - twitter_text.getTweetLength(tweet);
         this.setState({
           tweet,
           remaining
         });
     }

     getSubs(props, state) {
         return props.store.allTasksSubs();
     }

     subscribeSubs (subs, props, state) {
         return props.store.subscribeSubs(subs);
     }

     render() {
         const tweets = this.props.store.getTasks();
         if (!tasks) {
           return <div>Loading tasks...</div>
         }
         
         return (
           <div>
               <div>
                 <div>{this.state.username}</div>
                 <div>
                   <textarea 
                     placeholder="What's happening?" 
                     onChange={this.updateTask} 
                     value={this.state.task.text}>
                     {this.state.task.text}
                   </textarea> 
                   {this.state.remaining}
                 </div>
                 <button onClick={this.submitTask}>Create Task</button>
               </div>
               <div className="tasks">
               {tasks.keys().reverse().map(messageKey => this.renderTask(messageKey, tasks.get(messageKey)))}
               </div>
           </div>
         );
    }
}

export default createAutoSubscriber()(observer(TaskList));
