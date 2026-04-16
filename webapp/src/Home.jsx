import { use, useEffect, useState } from 'react'
import largeLogo from './Assets/large-logo.png'
import waves from './Assets/waves.png'
import './Home.css'
import { socket } from './socket.js'

function Home() {
  const [ping, setPing] = useState(0)
  const [pong, setPong] = useState(0)

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
      <div id="home-page">
        <img id="large-logo" src={largeLogo} alt="Large Logo" />
        <p id='subtitle'>the dating app that </p>
        <p id='subtitle'>understands YOU first.</p>
        <button id='enter-button' onClick={() => socket.emit('enter-matchmaking')}>find someone on your wavelength today!</button>
        <img id="waves" src={waves} alt="Waves" />
      </div>
    </>
  )
}

export default Home
