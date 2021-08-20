import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyDg4g7IKnF3DQjasDXsqhZaxt3Jp1zaalE",
  authDomain: "flaschenpiraten-2.firebaseapp.com",
  projectId: "flaschenpiraten-2",
  storageBucket: "flaschenpiraten-2.appspot.com",
  messagingSenderId: "865138931443",
  appId: "1:865138931443:web:dd1f41b02d404293a06986",
  measurementId: "G-G73HFV4NH8"
};
firebase.initializeApp(config);
const storage = firebase.storage();
const auth = firebase.auth();

export { auth, storage, firebase as default };