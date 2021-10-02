import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDANn6VLzp-a8o-_TYwt5-05qALWcjEUpU",
  authDomain: "fyp-ll.firebaseapp.com",
  projectId: "fyp-ll",
  storageBucket: "fyp-ll.appspot.com",
  messagingSenderId: "703052303860",
  appId: "1:703052303860:web:1437f682bc375fc49d3da1"
    
};

const fire = firebase.initializeApp(firebaseConfig)
export const db = fire.firestore()
export const auth = fire.auth()

export default fire