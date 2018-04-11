import {observable, action} from 'mobx'

class UserStore {
  @observable currentUser = null;
  @observable remoteCounter = 0;
  @observable users = [];

  @action
  setUsers = (users) => {
    this.users = users;
  }

  @action
  setCurrentUser(user) {
    this.currentUser = user;
  }
}

const userStore = new UserStore;

export default userStore;
