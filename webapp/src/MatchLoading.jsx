import { useEffect, useState } from 'react'
import largeLogo from './Assets/large-logo.png'
import waves from './Assets/waves.png'
import './MatchLoading.css'
import { socket } from './socket.js'
import { useNavigate } from 'react-router-dom'


function MatchLoading({progressText, setPartner}) {
  const navigate = useNavigate()
  // Server exhausted all retries without finding a compatible match
  const [failed, setFailed] = useState(false)
  // Socket dropped while waiting — network issue or server crash
  const [disconnected, setDisconnected] = useState(false)

  useEffect(() => {
      // Server found a match
      socket.on('enter-chat', partner => {
        setPartner(partner)
        navigate('/chat')
      })
  
      // Server ran out of retries without finding anyone compatible.
      socket.on('matchmaking-failure', () => {
        setFailed(true)
      })
  
      // Socket dropped
      socket.on('disconnect', () => {
        setDisconnected(true)
      })
  
      // Socket reconnected
      socket.on('connect', () => {
        setDisconnected(false)
      })
      
      // Sockets walk the plank
      return () => {
        socket.off('enter-chat')
        socket.off('matchmaking-failure')
        socket.off('disconnect')
        socket.off('connect')
      }
    }, [])

  if (disconnected) {
      return (
        <div id="loading-page">
          <img id="loading-large-logo" src={largeLogo} alt="Large Logo" />
          <p id="loading-message">Connection lost. Please check your internet and try again.</p>
          <button id="loading-next-button" onClick={() => navigate('/')}>
            Go Home
          </button>
          <img id="loading-waves" src={waves} alt="Waves" />
        </div>
      )
    }

  if (failed) {
      return (
        <div id="loading-page">
          <img id="loading-large-logo" src={largeLogo} alt="Large Logo" />
          <p id="loading-message">We couldn't find a match right now. Try again in a little while!</p>
          <button
            id="loading-next-button"
            onClick={() => {
              setFailed(false)
              socket.emit('enter-matchmaking')
            }}
          >
            Try Again
          </button>
          <button id="loading-next-button" onClick={() => navigate('/')}>
            Go Home
          </button>
          <img id="loading-waves" src={waves} alt="Waves" />
        </div>
      )
    }

  return (
      <div id="loading-page">
        <img id="loading-large-logo" src={largeLogo} alt="Large Logo" />
        <p id="loading-message">{progressText?.message || 'Finding a match...'}</p>
        <img id="loading-waves" src={waves} alt="Waves" />
      </div>
    )
  }

export default MatchLoading