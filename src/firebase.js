// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBJxeOv4OH9aaHrvGdSF7lvVdQ9CIxPqj4",
    authDomain: "chat-app-mern-ca251.firebaseapp.com",
    projectId: "chat-app-mern-ca251",
    storageBucket: "chat-app-mern-ca251.appspot.com",
    messagingSenderId: "708672947907",
    appId: "1:708672947907:web:9dcd04f2ea6f5d63824476"
  };

  const firebase_app=firebase.initializeApp(firebaseConfig);
  const db = firebase_app.firestore();
  const auth=firebase.auth()
  const provider= new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
    
