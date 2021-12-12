import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {

  apiKey: "AIzaSyBzR9hHetPcl9xhecSrvFqX-Qh6wtd6ZLs",
  authDomain: "fyp-ii-c627f.firebaseapp.com",
  projectId: "fyp-ii-c627f",
  storageBucket: "fyp-ii-c627f.appspot.com",
  messagingSenderId: "1082860193180",
  appId: "1:1082860193180:web:6c2d81fa7b5bd868887459"

};

const fire = firebase.initializeApp(firebaseConfig)
export const db = fire.firestore()
export const auth = fire.auth()
export const storage = fire.storage()


export default fire