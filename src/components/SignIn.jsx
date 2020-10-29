import React from 'react';
import  firebase from "firebase";
import './SignIn.css';

function SignIn() {
    const signInWithGoogle = () =>{
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    }
    return (
        <>
            <h3>Welcome to</h3>
            <span>CHAT-FREE</span>
            <button onClick={signInWithGoogle} >SIGN IN</button>
        </>
    )

}
export default SignIn;