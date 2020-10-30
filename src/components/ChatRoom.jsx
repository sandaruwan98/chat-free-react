import React,{ useRef, useState } from 'react';

import  firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'
import ChatMessage from './ChatMessage'
import { useCollectionData } from "react-firebase-hooks/firestore";


function ChatRoom() {
  const dummy = useRef()
  const messageRef = firebase.firestore().collection('messages')
  // const query =  messageRef.orderBy('createdAt').limit(25)
  const query =  messageRef.orderBy('createdAt')
  const [messages] = useCollectionData( query ,{ idField: 'id' })

  const [formVal,setFormVal] = useState('')
  const [replyID,setReplyID] = useState('0')

 const sendMessage = async(e) => {
    e.preventDefault()
    const {uid , photoURL } = firebase.auth().currentUser;
    

    await messageRef.add({
      text: formVal,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      replyID
    })
    setFormVal('')
    dummy.current.scrollIntoView( {behavior: 'smooth'} )
 }

  function setReply(id) {
    console.log(id);
    setReplyID(id)
  }

  return (
    <>
    <div className="main">
      { messages && messages.map( msg => <ChatMessage key={msg.id} id={msg.id} message={msg} handlereply={setReply} currentUser={ firebase.auth().currentUser.uid} /> ) }
    
      <span ref={dummy}></span>
    </div>
    
    <form onSubmit={sendMessage} >
      <input value={formVal} onChange = { e => setFormVal(e.target.value) }/>
      <button type="submit">💨</button>
    </form>
    </>
  )
}



export default ChatRoom;