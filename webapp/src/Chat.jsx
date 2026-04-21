import { use, useEffect, useState } from 'react'
import searchIcon from './Assets/SearchIcon.png'
import arrowLeft from './Assets/ArrowLeft.png'
import './Chat.css'
import { socket } from './socket.js'
import { useNavigate } from 'react-router-dom'


function Chat({sendMessage}) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [selectedContact, setSelectedContact] = useState('John Doe')
  const contacts = ['John Doe', 'Person A', 'Person B']

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
