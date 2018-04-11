import firebase from 'firebase';
import TaskStore from './stores/TaskStore';
import UserStore from './stores/UserStore';

let config = {
    apiKey: "AIzaSyBfPOZwXyTq5Vj7OmKKgqIN9ijJKZGRCEk",
    authDomain: "taskarea-10ebf.firebaseapp.com",
    databaseURL: "https://taskarea-10ebf.firebaseio.com/",
    projectId: "taskarea-10ebf",
    storageBucket: "taskarea-10ebf.appspot.com",
    messagingSenderId: "31706505887",
};

export const firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();
export const storageKey = 'pain-login';

export const isAuthenticated = () => {
    return !!auth.currentUser || !!localStorage.getItem(storageKey);
}

db.ref("users/").on("value", (snapshot) => {
    UserStore.setUsers(snapshot.val());
}, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
});

db.ref('tasks/').orderByChild('timestamp')
    .startAt(Date.now())
    .on('child_added', function(snapshot) {
        TaskStore.showNewTask(snapshot.val());
    });