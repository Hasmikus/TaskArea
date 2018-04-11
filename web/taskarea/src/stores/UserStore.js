import {observable, action} from 'mobx';
import {auth} from '../firebase';

class UserStore {
    @observable authState = false;
    @observable currentUser = null;
    @observable users = [];

    @action
    setUsers = (users) => {
        this.users = users;
    }

    @action
    userSignupRequest = (userData, auth) => {
        return auth.createUserWithEmailAndPassword(userData.email, userData.password)
            .then((user) => {
                user.updateProfile({
                    displayName: userData.username,
                    photoURL: 'https://www.drupal.org/files/profile_default.png',
                });
                return {
                    username: userData.username,
                    photoURL: 'https://www.drupal.org/files/profile_default.png',
                    uid: user.uid,
                    email: userData.email,
                };
            });
    }

    @action
    userSignInRequest(userData, auth) {
        let self = this;
        return auth.signInWithEmailAndPassword(userData.email, userData.password)
            .then(function() {
                self.signInError = null;
            })
            .catch(function(error) {
                self.signInError = error;
                return {error: self.signInError.message};
            })
    }

    @action
    signOut() {
        auth.signOut();
    }
}

export default new UserStore();
