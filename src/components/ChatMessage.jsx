import React from 'react';

function ChatMessage(props) {
    const { text, uid, photoURL,replyID  } = props.message;
    const messageClass = uid === props.currentUser ? 'sent' : 'recieved'
    return (
      (replyID === '0') ? 
      <div onClick={  () => props.handlereply(props.id)} className={ "message " + messageClass }>
        <img src={photoURL}/>
        <p  >{text}</p>
      </div>
      :
      <>
     
      <div onClick={  () => props.handlereply(props.id)} className={ "message " + messageClass } 
       style={{ marginTop: "25px" }} >
        <img src={photoURL}/>
        <p  className="reply">{text}</p>
        <p  >{text}</p>
      </div>
      </>
    )
  }

export default ChatMessage;