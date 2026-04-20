import { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../socket.js'
import RatingComponent from '../Components/RatingComponent.jsx'
import './Survey.css'

function Survey13() {
  const [ping, setPing] = useState(0)
  const [pong, setPong] = useState(0)
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)


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
        <div id="progress-bar-survey1"></div>
    </div>
      <div id="main-area">
        <h1 id="Heading-survey1">How interested are you in:</h1>
        <h1 id="Heading-survey1">watching movies</h1>
        <RatingComponent selected={selected} setSelected={setSelected} />
      </div>
      <button id="next-button" className='bree-serif-regular' onClick={() => navigate('/survey14')}>
        Next Question
      </button>
    </>
  )
}

export default Survey13
