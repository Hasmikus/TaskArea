export  function userSignupRequest(userData, auth, database) {
   return auth.createUserWithEmailAndPassword(userData.email, userData.password)
       .then(function(user) {
         database.ref('users').push({username: userData.username, email: userData.email});
       })
       .catch(function(error) {
           var errorCode = error.code;
           var errorMessage = error.message;
           console.log(errorMessage);
       })
}
export function userSignInRequest(userData, auth) {
    return auth.signInWithEmailAndPassword(userData.email, userData.password)
        .then(function(user) {
            console.log('sign in', user);
        })
        .catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
        })
}
