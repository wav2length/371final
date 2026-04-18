import { use, useEffect, useState } from 'react'
import './Onboarding1.css'
import { socket } from '../socket.js'
import { useNavigate } from 'react-router-dom'

function Onboarding1() {
  const [ping, setPing] = useState(0)
  const [pong, setPong] = useState(0)
    const navigate = useNavigate()

  useEffect(() => {
    socket.on('pong', () => {
      // expected to be more, socket.io sends multiple pings during testing
      setPong((pong) => pong + 1)
    })

    socket.on('enter-matchmaking-success', () => {
      return;
    });
    socket.on('enter-matchmaking-failure', () => {
      return;
    });
    socket.on('matchmaking-progress', update => {
      return;
    });

    socket.on('enter-chat', partner => {
      return;
    });
    socket.on('receive-chat', message => {
      return;
    });
    socket.on('partner-leave-chat', () => {
      return;
    });
  })

  return (
    <>
    <div id="progress-container">
        <div id="progress-bar-board1"></div>
    </div>
      <div id="main-area">
        <h1 id="Heading">Tell Us About Yourself</h1>
        <p id="subheading-board1">First Name</p>
        <input id="input-text" type="text" placeholder="Enter your first name here..."/>
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
