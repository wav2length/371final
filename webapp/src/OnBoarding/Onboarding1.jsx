import { use, useEffect, useState } from 'react'
import './Onboarding1.css'
import { socket } from '../socket.js'
import { useNavigate } from 'react-router-dom'

function Onboarding1({setFirstName, setLastName, setPronouns}) {
  const navigate = useNavigate()

  return (
    <>
    <div id="progress-container">
        <div id="progress-bar-board1"></div>
    </div>
      <div id="main-area">
        <h1 id="Heading-board1">Tell Us About Yourself</h1>
        <p id="subheading-board1">First Name</p>
        <input id="input-text" type="text" placeholder="Enter your first name here..." required/>
        <p id="subheading-board1">Last Name</p>
        <input id="input-text" type="text" placeholder="Enter your last name here..."/>
        <p id="subheading-board1">Pronouns</p>
        <input id="input-text" type="text" placeholder="Enter your pronouns here..."/>
      </div>
      <button id="next-button" className='bree-serif-regular' onClick={() => {socket.emit('enter-matchmaking') 
        navigate('/Onboarding2')}}>
        Next Question
      </button>
    </>
  )
}

export default Onboarding1
