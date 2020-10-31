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
  const [replyText,setReplyText] = useState('0')
  

 const sendMessage = async(e) => {
    e.preventDefault()
    const {uid , photoURL } = firebase.auth().currentUser;

    // var replyText = '';
    // if (replyID !== '0') {
    //   replyText = await  messageRef.doc(replyID).get().then(snap => {
    //     return snap.data().text
    //   })
    // }
    
   
    await messageRef.add({
      text: formVal,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      replyText: replyText
    })
    setFormVal('')
    setReplyText('0')

    dummy.current.scrollIntoView( {behavior: 'smooth'} )
 }

  function handleReply(txt) {
   
    setReplyText(txt)
    console.log(replyText);
  }

  return (
    < >
    <div className="main">
      { messages && messages.map( msg => {
          return <ChatMessage key={msg.id}  message={msg} handlereply={handleReply}  />
       
        })

      }
    
      <span ref={dummy}></span>
    </div>
    <div className="reply-popup">
    <p>{replyText}</p>
    </div>

    <form onSubmit={sendMessage} >
      <input value={formVal} onChange = { e => setFormVal(e.target.value) }/>
      <button type="submit">💨</button>
    </form>

    
    </>
  )
}



export default ChatRoom;