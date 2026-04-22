import { use, useEffect, useState } from 'react'
import largeLogo from './Assets/large-logo.png'
import waves from './Assets/waves.png'
import './MatchLoading.css'
import { socket } from './socket.js'
import { useNavigate } from 'react-router-dom'


function MatchLoading({progress}) {
  const navigate = useNavigate()

  return (
    <>
      {/* Design for loading page */}
      <div id="loading-page">
        <img id="large-logo-loading" src={largeLogo} alt="Large Logo" />
        <p id="loading-message">{progress && progress.message || "Finding a match..."}</p>
        <button id="next-button-loading" style={{visibility: 'hidden'}} onClick={() => navigate('/matches') }>
          View Matches
        </button>
        
        <img id="waves-loading" src={waves} alt="Waves" />
      </div>
    </>
  )
}

export default MatchLoading