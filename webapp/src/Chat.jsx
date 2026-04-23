import { useEffect, useState } from 'react'
import './Chat.css'
import { socket } from './socket.js'
import { useNavigate } from 'react-router-dom'

function Chat({ partner }) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [partnerLeft, setPartnerLeft] = useState(false)

  useEffect(() => {
    // Listen for incoming messages from the partner
    socket.on('receive-message', message => {
      setMessages(prev => [...prev, {...message, sender: partner?.username || 'Partner'}])
    })

    // Partner left — show an in-chat notice rather than a jarring alert
    socket.on('partner-leave-chat', () => {
      setPartnerLeft(true)
      // Add a system message to the chat so the user can see what happened
      setMessages(prev => [...prev, {
        sender: 'System',
        content: `${partner?.username || 'Your match'} has left the chat.`,
        timestamp: Date.now(),
        isSystem: true
      }])
    })

    // Make the sockets face the wall
    return () => {
      socket.off('receive-message')
      socket.off('partner-leave-chat')
    }
  }, [partner])

  const handleSend = () => {
    // Don't send if input is empty or partner already left
    if (!input.trim() || partnerLeft) return

    const message = {
      sender: 'You',
      content: input.trim(),
      timestamp: Date.now()
    }

    // Add to local messages immediately so sender sees it right away
    setMessages(prev => [...prev, message])
    socket.emit('send-message', message)
    setInput('')
  }

  const handleLeaveChat = () => {
    // Notify the server that this user is leaving
    // Server will then notify the partner via 'partner-leave-chat'
    socket.emit('leave-chat')
    navigate('/')
  }

  // Pull the career field name from the partner info object
  // Career flags are 1/0: find whichever one is set
  const getCareer = (info) => {
    if (!info) return '—'
    const careerKeys = Object.keys(info).filter(k => k.startsWith('career_') && info[k] === 1)
    if (careerKeys.length === 0) return 'Unknown'
    // Convert key like "career_creative_arts" -> "Creative Arts"
    return careerKeys[0]
      .replace('career_', '')
      .split('_')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }

  // Pull interest names where rating is above 3 stars
  const getTopInterests = (info) => {
  if (!info) return []
  const interestKeys = ['sports', 'tvsports', 'exercise', 'dining', 'museums',
    'art', 'hiking', 'gaming', 'clubbing', 'reading', 'tv',
    'theater', 'movies', 'concerts', 'music', 'shopping', 'yoga']
  return interestKeys.filter(k => info[k] >= 6).map(k => ({
      name: k.charAt(0).toUpperCase() + k.slice(1),
      score: info[k] / 2  // convert back from 1-10 DB scale to 1-5 stars
    }))
}

const getDisplayName = (sender) => {
  if (sender === 'You') return 'You'
  return info ? `${info.firstName} ${info.lastName}` : sender
}

  const info = partner?.info
  const topInterests = getTopInterests(info)

  return (
    <div id="chat-page">
      {/* Left sidebar — partner info */}
      <div id="chat-sidebar">
        <h2 id="chat-sidebar-name">{info ? `${info.firstName} ${info.lastName}` : 'Your Match'}</h2>

        <div id="chat-sidebar-section">
          <p className="sidebar-label">Gender</p>
          <p className="sidebar-value">{info?.gender || '—'}</p>
        </div>

        <div id="chat-sidebar-section">
          <p className="sidebar-label">Pronouns</p>
          <p className="sidebar-value">{info?.pronouns || '—'}</p>
        </div>

        <div id="chat-sidebar-section">
          <p className="sidebar-label">Career</p>
          <p className="sidebar-value">{getCareer(info)}</p>
        </div>

        <div id="chat-sidebar-section">
          <p className="sidebar-label">Top Interests</p>
          {topInterests.length > 0
            ? topInterests.map(interest => (
                <p key={interest.name} className="sidebar-value">
                  {interest.name} — {'★'.repeat(interest.score)}{'☆'.repeat(5 - interest.score)}
                </p>
              ))
            : <p className="sidebar-value">—</p>
          }
        </div>

        {/* Leave chat button in sidebar so it's always visible */}
        <button id="chat-leave-button" onClick={handleLeaveChat}>
          Leave Chat
        </button>
      </div>

      {/* Right chat area */}
      <div id="chat-chat-area">
        <div id="chat-chat-header">
          <h2>{info ? `${info.firstName} ${info.lastName}` : 'Chat'}</h2>
          {/* Show a status indicator if partner has left */}
          {partnerLeft
            ? <p id="chat-partner-status-left">Left the chat</p>
            : <p id="chat-partner-status-active">Active</p>
          }
        </div>

        <div id="chat-messages-list">
          {messages.map((msg, i) => (
            // System messages like "partner left" get their own style
            msg.isSystem
              ? <p key={i} id="chat-system-message">{msg.content}</p>
              : <div key={i} className={`message ${msg.sender === 'You' ? 'mine' : 'theirs'}`}>
                  <div className="avatar">
                    {msg.sender.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="sender-name">{getDisplayName(msg.sender)}</p>
                    <p className="message-content">{msg.content}</p>
                  </div>
                </div>
          ))}
        </div>

        <div id="chat-input-area">
          <input
            id="chat-message-input"
            type="text"
            placeholder={partnerLeft ? 'Your match has left the chat...' : 'Write a message...'}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            // Disable input if partner has left so user knows they can't message anymore
            disabled={partnerLeft}
          />
          <button id="chat-send-button" onClick={handleSend} disabled={partnerLeft}>➤</button>
        </div>
      </div>
    </div>
  )
}

export default Chat