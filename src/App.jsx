import React from 'react';
import './App.css';
import ChatRoom from './components/ChatRoom'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import  firebase from "firebase";
import 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(firebase.auth())

  return (
    <div className="App">
      <header>
        <SignOut />
      </header>
      <section>
        { user ? <ChatRoom/> : <SignIn/> }
      </section>
    </div>
  );
}


export default App;
