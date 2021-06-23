import React, {useState , useEffect} from 'react';
import Button from './components/Button';
import Channel from './components/channel';

// import { Button} from 'react-bootstrap';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyAuCIrgJW_m5vbPRA9Nz3HG8GLwwWFQK1U",
        authDomain: "react-firechat-856d1.firebaseapp.com",
        projectId: "react-firechat-856d1",
        storageBucket: "react-firechat-856d1.appspot.com",
        messagingSenderId: "712313357094",
        appId: "1:712313357094:web:4320ed9fd447a02c1537e7"
    });
}
else {
   firebase.app();
}
const auth = firebase.auth();
const db = firebase.firestore();

function App() {

  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if(initializing){
        setInitializing(false);
      }
    });
    
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();

    try {
      await auth.signInWithPopup(provider);
    } catch(error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch(error) {
      console.log(error.message);
    }
  };

  if (initializing) return 'Loading...';
  // const firebaseApp = firebase.apps[0];
  return (

    // <div>
    //   <h1>React & Firebase</h1>
    //   <h2>By @farazamiruddin</h2>
    //   <code>
    //     <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
    //   </code>
    // </div>

    <div>
    {user ? (
      <>
        <Button onClick={signOut}>Sign Out</Button>
        <Channel user={user} db={db} />
      </>
    ) : (
        <Button onClick={signInWithGoogle}>Sign In With Google</Button>
    )}
    </div>
    // <div>
    //   {user ? (
    //     <>
    //       <Button onClick={signout}>Sign Out</Button>
    //       <p>Welcome to the chat</p>
    //       <Channel user={user} db={db}/>
    //     </>
    //   ) : (
    //     <>
    //     <Button onClick={signInWithGoogle}>Sign In With Google</Button>
    //     <p>'Welcome to the chat'</p>
        
    //     </>
    //   )}
    // </div>
  );
}

export default App;
