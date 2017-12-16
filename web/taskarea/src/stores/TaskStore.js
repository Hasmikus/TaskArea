import Firebase from 'firebase';
import MobxFirebaseStore from 'mobx-firebase-store';
import {firebaseApp} from '../firebase';

const tasks_subkey = 'tasks';

export default class TaskStore extends MobxFirebaseStore {
 
  constructor(config) {
      const fbApp = firebaseApp;
      const store = new MobxFirebaseStore(Firebase.database(fbApp).ref());
      super(store.fb);
  }

  allTweetsSubs() {
      return [{
          subKey: tasks_subkey,
          asList: true,
      }];
  }

  createTask(task) {
      this.fb.child(tasks_subkey).push(task);
  }

  resolveFirebaseQuery(sub) {
      return this.fb.child(tasks_subkey).orderByChild('timestamp').limitToLast(10);
  }
}
