import { use, useEffect, useState } from 'react'
import searchIcon from './Assets/SearchIcon.png'
import arrowLeft from './Assets/ArrowLeft.png'
import './Chat.css'
import { socket } from './socket.js'
import { useNavigate } from 'react-router-dom'


function Chat() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [selectedContact, setSelectedContact] = useState('John Doe')
  const contacts = ['John Doe', 'Person A', 'Person B']


  const [username, setUsername] = useState('');

  const [newProgress, setNewProgress] = useState({
    timestamp: undefined,
    message: '', 
  })

  const [partner, setPartner] = useState('');
  const [messageHistory, setMessageHistory] = useState([])

  function loginWithUsername(username) {
    setUsername(username);
    socket.emit('login', username);
  }

  function enterMatchmaking() {
    if (username) {
      socket.emit('enter-matchmaking');
    } else {
      // User needs to log in with a username before entering matchmaking
      // Something with our navigation logic is wrong if this branch runs
    }
  }

  function sendMessage(content) {
    socket.emit('send-message', {
      timestamp: Date.now(),
      content: content
    });
  }

  useEffect(() => {
    socket.on('pong', () => {
      // expected to be more, socket.io sends multiple pings during testing
      setPong((pong) => pong + 1);
    });

    socket.on('login-success', () => {
      // TODO probably navigate somewhere
    });

    socket.on('enter-matchmaking-success', () => {
      // TODO navigate to a progress page
      return;
    });
    socket.on('matchmaking-progress', update => {
      // useState is weird with objects so I don't think this actually works but I'll be responsible for fixing it later
      setNewProgress(update)
      return;
    });
    socket.on('matchmaking-failure', () => {
      // TODO show an alert
      return;
    });

    socket.on('enter-chat', partner => {
      // TODO what information do we want to show the user about their match?
      setPartner(partner);
    });
    socket.on('receive-message', message => {
      setMessageHistory([...messageHistory, message]);
    });
    socket.on('partner-leave-chat', () => {
      // TODO show some sort of alert and navigate away from the chat
      return;
    });
  });

  return (
  <div id="chat-page">
    {/* Left sidebar */}
    <div id="sidebar">
      <h2>Messages</h2>
      <div id="search-wrapper">
        <img src={searchIcon} alt="search" id="search-icon" />
        <input id="search" type="text" />
    </div>
      {contacts.map(contact => (
        <button
          key={contact}
          className={selectedContact === contact ? 'contact selected' : 'contact'}
          onClick={() => setSelectedContact(contact)}
        >
          {contact}
        </button>
      ))}
    </div>

    {/* Right chat area */}
    <div id="chat-area">
      {/* Header */}
      <div id="chat-header">
        <h2>{selectedContact}</h2>
        <button id="info-button">?</button>
      </div>

      {/* Messages */}
      <div id="messages-list">
        {messages.map((msg, i) => (
          <div key={i} className="message">
            <div className="avatar">{msg.sender.split(' ').map(n => n[0]).join('')}</div>
            <div>
              <p className="sender-name">{msg.sender}</p>
              <p className="message-content">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div id="input-area">
        <input
          id="message-input"
          type="text"
          placeholder="Write a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button id="send-button" onClick={sendMessage}>➤</button>
      </div>
        <button id="back-button" onClick={() => navigate('/matches')}><img src={arrowLeft} alt="left arrow" /></button>
    </div>
  </div>
)
}

export default Chat
