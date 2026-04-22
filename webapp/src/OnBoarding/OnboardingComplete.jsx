import { use, useEffect, useState } from 'react'
import largeLogo from '../Assets/large-logo.png'
import waves from '../Assets/waves.png'
import './OnboardingComplete.css'
import { socket } from '../socket.js'
import { useNavigate } from 'react-router-dom'


function OnboardingComplete() {
  const navigate = useNavigate()

  const handleNext = () => {
    // Notify server to start match making
    socket.emit('enter-matchmaking')

    // Navigate to matches
    navigate('/matchmaking')
  }  
  return (
    <>
      <div id="progress-container">
        <div id="progress-bar-complete"></div>
        </div>
      <div id="home-page">
        <h1 id="Heading-complete">Onboarding</h1>
        <h1 id="Heading-complete">Complete!</h1>
        <button id='next-button' onClick={handleNext}>
          FIND YOUR WAVE
        </button>
        <img id="waves" src={waves} alt="Waves" />
      </div>
    </>
  )
}

export default OnboardingComplete
