import React from 'react';
import  firebase from "firebase";

function ChatMessage(props) {
    const { text, uid, photoURL ,replyText } = props.message;
    // console.log(props.replyText);
    const messageClass = uid === firebase.auth().currentUser.uid ? 'sent' : 'recieved'
    return (
      (replyText === '') ? 
      <div onDoubleClick={  () => props.handlereply(text)} className={ "message " + messageClass }>
        <img src={photoURL}/>
        <p  >{text}</p>
      </div>
      :
      <>
     
      <div className={ "message " + messageClass } 
       style={{ marginTop: "15px"}} >
        <img src={photoURL}/>
        <div className="with-reply">
          <p  className={"reply-"+messageClass} >{ replyText }</p>
          <p   onDoubleClick={  () => props.handlereply(text)} >{text}</p>
        </div>
      </div>
      </>
    )
}

export default ChatMessage;