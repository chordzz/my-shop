import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDuIhk0u6zApNzzuH8-j4g8DbHFoJxqoOg",
  authDomain: "my-shop-2bba4.firebaseapp.com",
  projectId: "my-shop-2bba4",
  storageBucket: "my-shop-2bba4.appspot.com",
  messagingSenderId: "286426976627",
  appId: "1:286426976627:web:192f00952c20c3e9cf7506",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
