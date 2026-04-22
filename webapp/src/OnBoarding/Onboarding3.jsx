import { use, useEffect, useState } from 'react'
import './Onboarding3.css'
import { socket } from '../socket.js'
import { useNavigate } from 'react-router-dom'

function Onboarding3() {
  const navigate = useNavigate()
  const [age, setAge] = useState(18)

  const handleNext = () => {
    socket.emit('store-onboarding3-results', JSON.stringify(age))
    navigate('/onboarding4')
  }

  return (
    <>
    <div id="progress-container">
        <div id="progress-bar-board3"></div>
    </div>
      <div id="main-area">
        <h1 id="Heading-board3">Tell Us About Yourself</h1>
        <h2 id="subheading-board3">How old are you?</h2>
        <div id="options-container">
            <input id="input-num" type="number" min="18" max="120" value={age} onChange={(e) => {setAge(e.target.value)}}
              onBlur={(e) => {
                if (age < 18) setAge(18)
                if (age > 120) setAge(120)
              }}/>  
        </div>
      </div>
      <button id="next-button" className='bree-serif-regular' onClick={handleNext}>
        Next Question
      </button>
    </>
  )
}

export default Onboarding3
