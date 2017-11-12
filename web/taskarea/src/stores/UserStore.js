import {observable, action} from 'mobx';

class UserStore {
    @observable authState = false;
    @observable signInError = null;
    @observable signUpError = null;

    @action
    userSignupRequest(userData, auth) {
        let self = this;
        return auth.createUserWithEmailAndPassword(userData.email, userData.password)
            .then(function(user) {
                user.updateProfile({
                    displayName: userData.username,
                    photoURL: 'http://i.dailymail.co.uk/i/pix/2016/05/23/22/348B850600000578-3605456-image-m-32_1464040491071.jpg',
                })
                    .then(function() {
                        self.signUpError = null;
                    })
                    .catch(function (error) {
                        self.signUpError = error;
                    });
            })
            .catch(function(error) {
                console.log(error.message);
            })
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
            })
    }

    @action
    signOut(auth) {
        auth.signOut();
    }
}

export default new UserStore();
