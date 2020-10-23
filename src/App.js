import React,{ useRef, useState } from 'react';
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
      <header>
       
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
    const dummy = useRef()
    const messageRef = firestore.collection('messages')
    const query =  messageRef.orderBy('createdAt').limit(25)
    const [messages] = useCollectionData( query ,{ idField: 'id' })

    const [formVal,setFormVal] = useState('')

   const sendMessage = async(e) => {
      e.preventDefault()
      const {uid , photoURL } = auth.currentUser;
      

      await messageRef.add({
        text: formVal,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
      setFormVal('')
      dummy.current.scrollIntoView( {behavior: 'smooth'} )
   }

    return (
      <>
      <div className="main">
        { messages && messages.map( msg => <ChatMessage key={msg.id} message={msg} /> ) }
      
        <span ref={dummy}></span>
      </div>
      
      <form onSubmit={sendMessage} >
        <input value={formVal} onChange = { e => setFormVal(e.target.value) }/>
        <button type="submit">🕊️</button>
      </form>
      </>
    )
}




function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved'
  return (
    <div className={ "message " + messageClass }>
      <img src={photoURL}/>
      <p  >{text}</p>

    </div>
  )
}

export default App;
