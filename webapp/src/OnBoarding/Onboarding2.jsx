import { use, useEffect, useState } from 'react'
import './Onboarding2.css'
import { socket } from '../socket.js'
import { useNavigate } from 'react-router-dom'

function Onboarding2() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const handleNext = () => {
    socket.emit('store-onboarding2-results', JSON.stringify(selected))
    navigate('/onboarding3')
  }
  return (
    <>
    <div id="progress-container">
        <div id="progress-bar-board2"></div>
    </div>
      <div id="main-area">
        <h1 id="Heading-board2">Tell Us About Yourself</h1>
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
      <button id="next-button" className='bree-serif-regular' onClick={handleNext}>Next Question</button>
    </>
  )
}

export default Onboarding2
