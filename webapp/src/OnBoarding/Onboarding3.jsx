import { use, useEffect, useState } from 'react'
import './Onboarding3.css'
import { socket } from '../socket.js'
import { useNavigate } from 'react-router-dom'

function Onboarding3() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(false)

  return (
    <>
    <div id="progress-container">
        <div id="progress-bar-board3"></div>
    </div>
      <div id="main-area">
        <h1 id="Heading-board3">Tell Us About Yourself</h1>
        <h2 id="subheading-board3">Do you have an ideal age range?</h2>
        <div id="options-container">
            <button id={selected === '18-25' ? 'clicked-option' : 'unclicked-option'}
                onClick={() => setSelected('18-25')}>
                18-25
            </button>

            <button id={selected === '26-35' ? 'clicked-option' : 'unclicked-option'}
                onClick={() => setSelected('26-35')}>
                26-35
            </button>
            <button id={selected === '36-45' ? 'clicked-option' : 'unclicked-option'}
                onClick={() => setSelected('36-45')}>
                36-45
            </button>
             <button id={selected === '46+' ? 'clicked-option' : 'unclicked-option'}
                onClick={() => setSelected('46+')}>
                46+
            </button>
            <button 
              id={selected === 'skip' ? 'clicked-option' : 'unclicked-option'}
              onClick={() => setSelected('skip')}>
              Skip
            </button>
        </div>
      </div>
      <button id="next-button" className='bree-serif-regular' onClick={() => navigate('/survey')}>
        Next Question
      </button>
    </>
  )
}

export default Onboarding3
