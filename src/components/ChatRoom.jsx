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
  const [reply,setReply] = useState('ff')
  

 const sendMessage = async(e) => {
    e.preventDefault()
    const {uid , photoURL } = firebase.auth().currentUser;
    let f= '' 
    messageRef.doc(replyID).get().then(snap => {
      // console.log(replymsg.data().text);
      setReply(snap.data().text);
      console.log(snap.data().text);
      console.log(reply);
      console.log("get");
    })

    setReply("irrr")
    console.log(reply);

    await messageRef.add({
      text: formVal,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      replyID,
      reply
    })
    setFormVal('')
    dummy.current.scrollIntoView( {behavior: 'smooth'} )
 }

  function handleReplyId(id) {
    console.log(id);
    setReplyID(id)
  }

  return (
    < >
    <div className="main">
      { messages && messages.map( msg => {
          let replyTxt =  'bla bla';

          // if (msg.replyID === '0') {
          //    replyTxt =  '';
          // }else{
            
            
          // }
          return <ChatMessage key={msg.id} id={msg.id} message={msg} replyText={replyTxt} handlereply={handleReplyId}  />
          
          
        } ) 
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