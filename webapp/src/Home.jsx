import { use, useEffect, useState } from 'react'
import largeLogo from './Assets/large-logo.png'
import waves from './Assets/waves.png'
import './Home.css'
import { socket } from './socket.js'
import { useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate()

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
      <div id="home-page">
        <img id="large-logo" src={largeLogo} alt="Large Logo" />
        <p id='subtitle' className='nova-oval-regular'>the dating app that </p>
        <p id='subtitle' className='nova-oval-regular'>understands YOU first.</p>
        <button id='enter-button' className='bree-serif-regular' onClick={() => {navigate('/Onboarding1')}}>
          find someone on your wavelength today!</button>
        <img id="waves" src={waves} alt="Waves" />
      </div>
    </>
  )
}

export default Home
