import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import  firebase from "firebase";


firebase.initializeApp({
  apiKey: "AIzaSyAph0R-bqdHs6fbXKnbJMHqWTPrZuE5AE8",
  authDomain: "chat-free-15915.firebaseapp.com",
  databaseURL: "https://chat-free-15915.firebaseio.com",
  projectId: "chat-free-15915",
  storageBucket: "chat-free-15915.appspot.com",
  messagingSenderId: "166015439326",
  appId: "1:166015439326:web:5ca1ff50158307f9708d4f",
  measurementId: "G-JYZ3X34R87"
})



ReactDOM.render( <App />,document.getElementById('root') );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
