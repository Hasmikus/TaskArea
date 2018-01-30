import {observable, action} from 'mobx';
import {db, auth} from '../firebase';

const tasks_subkey = 'tasks';

class TaskStore {
  @observable managedTasks = [];
  @observable tasks = [];

  setManagedTasks = () => {
      db.ref("tasks/").orderByChild("owner").equalTo(auth.currentUser.uid).on("value", (snapshot) => {
          this.managedTasks = snapshot.val();
      }, (errorObject) => {
          console.log("The read failed: " + errorObject.code);
      });
  }

  setCurrentTasks = () => {
      db.ref("tasks/").on("value", (snapshot) => {
          this.tasks = snapshot.val();
      }, (errorObject) => {
          console.log("The read failed: " + errorObject.code);
      });
  }

  @action
  createTask = (task) => {
      task.owner = auth.currentUser.uid;
      task.assignee = auth.currentUser.uid;
      task.state = 'new';
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
  }

}

export default new TaskStore();