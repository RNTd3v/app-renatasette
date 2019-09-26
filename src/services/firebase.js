import firebase from "firebase/app";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyBRnIgscphyARkvrKV3ycaCSxcsjRUkWQE",
  authDomain: "apprenatasette-1567104791521.firebaseapp.com",
  databaseURL: "https://apprenatasette-1567104791521.firebaseio.com",
  projectId: "apprenatasette-1567104791521",
  storageBucket: "apprenatasette-1567104791521.appspot.com",
  messagingSenderId: "75087871951",
  appId: "1:75087871951:web:9dd489f45e2ee945395cba",
  measurementId: "G-VLFC441J31"
};

const storage = !firebase.apps.length
  ? firebase.initializeApp(config).storage()
  : firebase.app().storage();

export { storage, firebase as default };
