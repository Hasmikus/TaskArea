import firebase from 'firebase';

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
export const storageKey = 'pain-login';

export const isAuthenticated = () => {
    return !!auth.currentUser || !!localStorage.getItem(storageKey);
}

export const state = auth.onAuthStateChanged(function(user) {
  if (user) {
      console.log('logged in', auth.currentUser);
  } else {
      console.log('Logged out');
  }
});
