import React, {useState , useEffect} from 'react';
import firebase from 'firebase/app';
import Message from './Message';

const Channel = ({ user, db}) => {

    // const user = props.user;
    // const db = props.db;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // const db = firebase.firestore();

    const { uid, displayName, photoURL } = user;
    useEffect(() => {
        if(db) {
            // console.log(db);
            const unsubscribe = db
                .collection("messages")
                .orderBy("createdAt")
                .limit(100)
                .onSnapshot(querySnapshot => {

                    const data = querySnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id,
                    }));

                    setMessages(data);
                })

                return unsubscribe;
        }
    }, [db]);

    
  const handleOnChange = e => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    if (db) {
        db.collection('messages').add({
            text: newMessage,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            displayName,
            photoURL
        })
    }
  }




    return (
        <div>
        <ul>
            {messages.map(message => (
                <li key={message.id}>
                    <Message {...message} />
                </li>
            ))}
        </ul>

         <form
          onSubmit={handleOnSubmit}
        //   className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md"
        >
          <input
            // ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
            // className="flex-1 bg-transparent outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage}
            // className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Send
          </button>
        </form>
        </div>
    );
};

export default Channel;