import React from 'react';
import  firebase from "firebase";

function SignOut() {
     
  return firebase.auth().currentUser && (
    <button onClick={()=> firebase.auth().signOut()} >Sign Out </button>
  )
  }
export default SignOut;