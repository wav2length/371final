import { use, useEffect, useState } from 'react'
import largeLogo from './Assets/large-logo.png'
import arrowLeft from './Assets/ArrowLeft.png'
import arrowRight from './Assets/ArrowRight.png'
import './MatchesPage.css'
import { socket } from './socket.js'
import { useNavigate } from 'react-router-dom'


function MatchesPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)

// hardcoded profiles for testing purposes, will be replaced with actual data from backend
const profiles = [
  { name: 'John Doe', age: 26, career: 'entertainment', interests: ['gaming', 'reading', 'concerts', 'yoga'], lookingFor: 'serious relationship' },
  { name: 'Jane Smith', age: 24, career: 'medicine', interests: ['hiking', 'cooking'], lookingFor: 'casual dating' },
  // add more profiles
]

const current = profiles[currentIndex]

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
    <>
      {/* Design for home page */}
      <div id="page">
        <div id="heading-container">
            <h1 id="Heading">Meet your</h1>
            <img id="large-logo" src={largeLogo} alt="Large Logo" />
        </div>
        <div id="carousel-container">
            <div id="cards-row">
            {/* left preview card */}
            <div className="side-card">
                <h2 id="Subheading">{profiles[(currentIndex - 1 + profiles.length) % profiles.length].name}</h2>
            </div>

            {/* main center card */}
            <div className="main-card">
                <h2 id="Subheading">{current.name}</h2>
                <p id="person-text">Age: {current.age}</p>
                <p id="person-text">Career: {current.career}</p>
                <p id="person-text">Interests: </p>
                <p id="person-text">{current.interests.join(', ')}</p>
                <p id="status-text">Looking for: {current.lookingFor}</p>
            </div>

            {/* right preview card */}
            <div className="side-card">
                <h2 id="Subheading">{profiles[(currentIndex + 1) % profiles.length].name}</h2>
            </div>
            </div>

            <div id="controls">
            <button onClick={() => setCurrentIndex((currentIndex - 1 + profiles.length) % profiles.length)}>
                <img src={arrowLeft} alt="left arrow" />
            </button>            
            <button id="chat-button" onClick={() => {navigate('/chat')}}>
              CHAT
            </button>
            <button onClick={() => setCurrentIndex((currentIndex + 1) % profiles.length)}>
              <img src={arrowRight} alt="right arrow" />
            </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default MatchesPage
