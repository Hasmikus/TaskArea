export function userSignupRequest(userData, database) {
    return dispatch => {
      return database.auth().createUserWithEmailAndPassword(userData.email, userData.password)
        .then(function(user) {
          let db = database.database();
          db.ref('users').push({username: userData.username, email: userData.email});
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    }
}
