import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyB9Ru-Anqy7EiAl17L46eMx3cAbJB5_R4k",
    authDomain: "whatsapp-clone-86084.firebaseapp.com",
    projectId: "whatsapp-clone-86084",
    storageBucket: "whatsapp-clone-86084.appspot.com",
    messagingSenderId: "346087046510",
    appId: "1:346087046510:web:e9a606dc9099c047eb957f",
    measurementId: "G-9P2B53CQPW"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider(); 

export { auth, provider };
export default db;