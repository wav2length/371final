import { use, useEffect, useState } from 'react'
import largeLogo from './Assets/large-logo.png'
import waves from './Assets/waves.png'
import './Home.css'
import { socket } from './socket.js'
import { useNavigate } from 'react-router-dom'

// TODO: Implement routing to log in / sign up pages
function Home() {
  const navigate = useNavigate()

  return (
    <>
      {/* Design for home page */}
      <div id="home-page">
        <img id="large-logo" src={largeLogo} alt="Large Logo" />
        <p id='subtitle'>the dating app that </p>
        <p id='subtitle'>understands YOU first.</p>
        <button id='enter-button' onClick={() => {navigate('/Onboarding1')}}>
          find someone on your wavelength today!</button>
        <img id="waves" src={waves} alt="Waves" />
      </div>
    </>
  )
}

export default Home
