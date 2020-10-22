import React from 'react';
import './App.css';


import  firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header className="App-header">
       
      </header>
      <section>
        { user ? <ChatRoom/> : <SignIn/> }
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle} >Sign In </button>
  )
}

function SignOut() {
 
  return auth.currentUser && (
    <button onClick={()=> auth.signOut()} >Sign Out </button>
  )
}

function ChatRoom() {
  
}

export default App;
