import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {

  apiKey: "AIzaSyDlBhlazq_oWPsuXiBUMCRRWec6Hy85T0s",
  authDomain: "external-evaluation.firebaseapp.com",
  projectId: "external-evaluation",
  storageBucket: "external-evaluation.appspot.com",
  messagingSenderId: "286226747298",
  appId: "1:286226747298:web:12210d393ec859fd882cfb",
  measurementId: "G-JEXKFN74G6"

  // apiKey: "AIzaSyBzR9hHetPcl9xhecSrvFqX-Qh6wtd6ZLs",
  // authDomain: "fyp-ii-c627f.firebaseapp.com",
  // databaseURL: "https://fyp-ii-c627f-default-rtdb.firebaseio.com",
  // projectId: "fyp-ii-c627f",
  // storageBucket: "fyp-ii-c627f.appspot.com",
  // messagingSenderId: "1082860193180",
  // appId: "1:1082860193180:web:6c2d81fa7b5bd868887459"
  // apiKey: "AIzaSyDKMbTfVLBNZG-EDoOwd86bJ8LA_kgLcf4",
  // authDomain: "musibat-ed68f.firebaseapp.com",
  // projectId: "musibat-ed68f",
  // storageBucket: "musibat-ed68f.appspot.com",
  // messagingSenderId: "800131519993",
  // appId: "1:800131519993:web:5efcbe9d1efb95ebf11928"


};

const fire = firebase.initializeApp(firebaseConfig)
export const db = fire.firestore()
export const auth = fire.auth()
export const storage = fire.storage()


export default fire