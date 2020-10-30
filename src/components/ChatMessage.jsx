import React from 'react';
import  firebase from "firebase";

function ChatMessage(props) {
    const { text, uid, photoURL,replyID  } = props.message;
    // console.log(props.replyText);
    const messageClass = uid === firebase.auth().currentUser.uid ? 'sent' : 'recieved'
    return (
      (replyID === '0') ? 
      <div onClick={  () => props.handlereply(props.id)} className={ "message " + messageClass }>
        <img src={photoURL}/>
        <p  >{text}</p>
      </div>
      :
      <>
     
      <div className={ "message " + messageClass } 
       style={{ marginTop: "25px" }} >
        <img src={photoURL}/>
        <p  onClick={  () => props.handlereply(props.id)} >{text}</p>
        <p  className={"reply-"+messageClass} >{ props.replyText }</p>
      </div>
      </>
    )
}

export default ChatMessage;