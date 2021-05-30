import firebase from 'firebase'
import 'firebase/auth'
var firebaseConfig = {
    apiKey: "AIzaSyDS5ucvxphcEnO9FYCLBaBlDpOuJ9FnyGo",
    authDomain: "e-reporting-development.firebaseapp.com",
    projectId: "e-reporting-development",
    storageBucket: "e-reporting-development.appspot.com",
    messagingSenderId: "427269583388",
    appId: "427269583388:web:2957d0e1e7e273e5efa5d9"
};

const fire = firebase.initializeApp(firebaseConfig)

export const auth = fire.auth()

export default fire