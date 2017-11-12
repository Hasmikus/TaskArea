import TaskStore from './TaskStore';
import UserStore from './UserStore';

export default class RootStore {
  constructor(config) {
    this.TaskStore = new TaskStore(this, config);
    //this.UserStore = new UserStore(this, config);
  }
}


