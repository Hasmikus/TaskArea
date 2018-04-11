import {observable, action} from 'mobx'
import firebase from 'react-native-firebase';

const tasks_subkey = 'tasks';

class TaskStore {
  @observable managedTasks = [];
  @observable tasks = null;
  @observable notificationTasks = [];

  @action
  setManagedTasks = () => {
      firebase.database().ref('/tasks/').orderByChild("owner").equalTo(firebase.auth().currentUser.uid).on("value", (snapshot) => {
        this.tasks = snapshot.val();
      }, (errorObject) => {
        console.log("The read failed: " + errorObject.code);
      });
  };

  @action
  setCurrentTasks = () => {
      firebase.database().ref('/tasks/').orderByChild("assignee").equalTo(firebase.auth().currentUser.uid).on("value", (snapshot) => {
        this.tasks = snapshot.val();
      }, (errorObject) => {
        console.log("The read failed: " + errorObject.code);
      });
  };

  @action
  showAllTasks = () => {
      firebase.database().ref('/tasks/').on("value", (snapshot) => {
        this.tasks = snapshot.val();
      }, (errorObject) => {
        console.log("The read failed: " + errorObject.code);
      });
  };

  @action
  createTask = (task) => {
      task.owner = firebase.auth().currentUser.uid;
      task.assignee = firebase.auth().currentUser.uid;
      task.state = 'new';
      task.timestamp = Date.now();
      firebase.database().ref(`${tasks_subkey}`).push(task);
  };

  @action
  assignTaskToUser = (userID, taskID) => {
      firebase.database().ref(`${tasks_subkey}/${taskID}/assignee`).set(userID);
      firebase.database().ref(`${tasks_subkey}/${taskID}/state`).set('inProgress');
  };

  @action
  closeTask = (taskID) => {
      firebase.database().ref(`${tasks_subkey}/${taskID}/state`).set('done');
  };

  getTask = (taskID) => {
      return firebase.database().ref(`${tasks_subkey}/${taskID}`);
  };

  showNewTask(newTask) {
    this.notificationTasks.push(newTask);
  }
}

const taskStore = new TaskStore;

export default taskStore;
