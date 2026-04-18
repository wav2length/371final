import { use, useEffect, useState } from 'react'
import './Onboarding2.css'
import { socket } from '../socket.js'
import { useNavigate } from 'react-router-dom'

function Onboarding2() {
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
        <div id="progress-bar"></div>
    </div>
      <div id="main-area">
        <h1 id="Heading">Tell Us About Yourself</h1>
        <h2 id="subheading-board2">Do you have a gender preference?</h2>
        <div id="options-container">
             <button id={selected === 'female' ? 'clicked-option' : 'unclicked-option'}
                onClick={() => setSelected('female')}>
                Yes, female
            </button>

            <button id={selected === 'male' ? 'clicked-option' : 'unclicked-option'}
                onClick={() => setSelected('male')}>
                Yes, male
            </button>
            <button id={selected === 'no-preference' ? 'clicked-option' : 'unclicked-option'}
                onClick={() => setSelected('no-preference')}>
                No preference
            </button>
        </div>
      </div>
      <button id="next-button" className='bree-serif-regular' onClick={() => navigate('/onboarding3') }>Next Question</button>
    </>
  )
}

export default Onboarding2
