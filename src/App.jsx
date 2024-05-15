import { useState, useEffect } from "react";
import "./App.css";
import {
  getFirestore,
  onSnapshot,
  collection,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isUsernameEntered, setIsUsernameEntered] = useState(false);

  useEffect(() => {
    const unsubscribeMessages = onSnapshot(
      query(collection(db, "messages"), orderBy("timestamp")),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );

    return () => {
      unsubscribeMessages();
    };
  }, []);

  const handleUsernameSubmit = () => {
    if (!username) {
      alert("Please enter your username.");
      return;
    }

    setIsUsernameEntered(true);
  };

  const handleLogout = () => {
    setIsUsernameEntered(false);
    setUsername("");
  };

  const sendMessage = async () => {
    if (!newMessage) {
      alert("Please enter a message.");
      return;
    }

    await addDoc(collection(db, "messages"), {
      username,
      text: newMessage,
      timestamp: serverTimestamp(),
    });
    setNewMessage("");
  };

  return (
    <div className="app-container">
      {!isUsernameEntered ? (
        <div className="username-input-container">
          <input
            className="username-input"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="submit-username-button"
            onClick={handleUsernameSubmit}
          >
            Enter
          </button>
        </div>
      ) : (
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((msg) => (
              <Message key={msg.id} msg={msg} username={username} />
            ))}
          </div>
          <div className="input-container">
            <input
              className="message-input"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="send-button" onClick={sendMessage}>
              Send
            </button>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

function Message({ msg, username }) {
  const { data } = msg;
  const isCurrentUser = data.username === username;
  const messageClass = isCurrentUser ? "current-user" : "other-user";

  return (
    <div className={`message ${isCurrentUser ? "right" : "left"}`}>
      <div className={`message-box ${messageClass}`}>
        <div className="user-info">
          <span className="user-name">{data.username}</span>
        </div>
        <div className="message-content">
          <span className={`message-text ${messageClass}`}>{data.text}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
