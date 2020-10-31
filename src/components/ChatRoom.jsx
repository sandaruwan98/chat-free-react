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
  // const [reply,setReply] = useState('ff')
  

 const sendMessage = async(e) => {
    e.preventDefault()
    const {uid , photoURL } = firebase.auth().currentUser;
    var replyText = '';
    if (replyID !== '0') {
      replyText = await  messageRef.doc(replyID).get().then(snap => {
        return snap.data().text
      })
    }
    
   

    // console.log(replyText);
   
    await messageRef.add({
      text: formVal,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      replyText
    })
    setFormVal('')
    setReplyID('0')

    dummy.current.scrollIntoView( {behavior: 'smooth'} )
 }

  function handleReplyId(id) {
   
    setReplyID(id)
    console.log(replyID);
  }

  return (
    < >
    <div className="main">
      { messages && messages.map( msg => {
          return <ChatMessage key={msg.id} id={msg.id} message={msg} handlereply={handleReplyId}  />
       
        })

      }
    
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