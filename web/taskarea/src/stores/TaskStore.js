import {observable, action} from 'mobx';
import {db, auth} from '../firebase';

const tasks_subkey = 'tasks';

class TaskStore {
  @observable managedTasks = [];
  @observable tasks = [];
  @observable notificationTasks = [];

  setManagedTasks = (tasks) => {
      this.managedTasks = tasks;
  };

  setCurrentTasks = (tasks) => {
      this.tasks = tasks;
  };

  @action
  createTask = (task) => {
      task.owner = auth.currentUser.uid;
      task.assignee = auth.currentUser.uid;
      task.state = 'new';
      task.timestamp = Date.now();
      db.ref(`${tasks_subkey}`).push(task);
  };

  @action
  assignTaskToUser = (userID, taskID) => {
      db.ref(`${tasks_subkey}/${taskID}/assignee`).set(userID);
      db.ref(`${tasks_subkey}/${taskID}/state`).set('inProgress');
  };

  @action
  closeTask = (taskID) => {
      db.ref(`${tasks_subkey}/${taskID}/state`).set('done');
  };

  getTask = (taskID) => {
      return db.ref(`${tasks_subkey}/${taskID}`);
  };

  showNewTask(newTask) {
      this.notificationTasks.push(newTask);
  }

}

export default new TaskStore();