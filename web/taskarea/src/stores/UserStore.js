import {observable, action} from 'mobx';
import {auth, db} from '../firebase';

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
        let self = this;
        return auth.createUserWithEmailAndPassword(userData.email, userData.password)
            .then((user) => {
                user.updateProfile({
                    displayName: userData.username,
                    photoURL: 'http://i.dailymail.co.uk/i/pix/2016/05/23/22/348B850600000578-3605456-image-m-32_1464040491071.jpg',
                });
                return {
                    username: userData.username,
                    photoURL: 'http://i.dailymail.co.uk/i/pix/2016/05/23/22/348B850600000578-3605456-image-m-32_1464040491071.jpg',
                    uid: user.uid,
                    email: userData.email
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
