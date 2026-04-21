import { use, useEffect, useState } from 'react'
import './Onboarding3.css'
import { socket } from '../socket.js'
import { useNavigate } from 'react-router-dom'

function Onboarding3() {
  const navigate = useNavigate()
  // agePreferernce state - numberic value XXYY or XX. 
  // For XXYY. XX is the lower bounds and YY is upper bounds (inclusive) thus 1825 is 18 to 25 year olds
  // For XX, XX is the lower bound thus 18 means 18+, 46 means 46+
  const [agePreference, setAgePreference] = useState(0)

  const handleNext = () => {
    socket.emit('store-onboarding3-results', JSON.stringify(agePreference))
    navigate('/survey')
  }

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
                onClick={setAgePreference(1825)}>
                18-25
            </button>

            <button id={selected === '26-35' ? 'clicked-option' : 'unclicked-option'}
                onClick={setAgePreference(2635)}>
                26-35
            </button>
            <button id={selected === '36-45' ? 'clicked-option' : 'unclicked-option'}
                onClick={setAgePreference(3645)}>
                36-45
            </button>
             <button id={selected === '46+' ? 'clicked-option' : 'unclicked-option'}
                onClick={setAgePreference(46)}>
                46+
            </button>
            <button 
              id={selected === 'skip' ? 'clicked-option' : 'unclicked-option'}
              onClick={setAgePreference(18)}>
              Skip
            </button>
        </div>
      </div>
      <button id="next-button" className='bree-serif-regular' onClick={handleNext}>
        Next Question
      </button>
    </>
  )
}

export default Onboarding3
