import React from 'react';

function ChatMessage(props) {
    const { text, uid, photoURL  } = props.message;
    const messageClass = uid === props.currentUser ? 'sent' : 'recieved'
    return (
      <div className={ "message " + messageClass }>
        <img src={photoURL}/>
        <p  >{text}</p>
  
      </div>
    )
  }

export default ChatMessage;