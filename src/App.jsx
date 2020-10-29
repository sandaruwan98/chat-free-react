import React from 'react';
import './App.css';
import ChatRoom from './components/ChatRoom'
import  firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from "react-firebase-hooks/auth";

// const auth = firebase.auth();
// const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(firebase.auth())

  return (
    <div className="App">
      <header>
        <SignOut />
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
    firebase.auth().signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle} >Sign In </button>
  )
}

function SignOut() {
 
  return firebase.auth().currentUser && (
    <button onClick={()=> firebase.auth().signOut()} >Sign Out </button>
  )
}







export default App;
