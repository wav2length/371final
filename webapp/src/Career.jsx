import { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from './socket.js'
import './Career.css'

function Career() {
  const [ping, setPing] = useState(0)
  const [pong, setPong] = useState(0)
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  
  const fields = [
    'Law', 'Academia', 'Psychology',
    'Medicine', 'Engineering', 'Creative',
    'Business', 'Real Estate', 'Humanitarian',
    'Social Work', 'Speech Pathology', 'Politics',
    'Athletics', 'Journalism', 'Architecture',
    'Other', 'Undecided'
]


const handleClick = (field) => {
  setSelected(selected === field ? null : field) // toggles on/off
}


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
    <div id="progress-container-career">
        <div id="progress-bar-career"></div>
    </div>
      <div id="main-area-career">
        <h1 id="Heading-career">What Field is your career in?</h1>
        <div id="fields-container">
        {fields.map((field) => (
            <button
            key={field}
            className={selected === field ? 'field-btn selected' : 'field-btn'}
            onClick={() => handleClick(field)}
            >
            {field}
            </button>
        ))}
        </div>

        
      </div>
      <button id="next-button-career" className='bree-serif-regular' onClick={() => navigate('/onboarding-complete')}>
        Next Question
      </button>
    </>
  )
}

export default Career
