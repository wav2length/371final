import { use, useEffect, useState } from 'react'
import './Onboarding3.css'
import { socket } from '../socket.js'
import { useNavigate } from 'react-router-dom'

function Onboarding3() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(false)

  const handleClick = () => {
    setSelected(!selected)  
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
            <h3 id="min">Minimum</h3>
            <h3 id="max">Maximum</h3>
        </div>
        <div id="options-container">
            <input id="input-num" type="number" min="18" max="100"/>  
            <input id="input-num" type="number" min="18" max="100"/>    
        </div>
       <button 
            id={selected ? 'clicked-option' : 'unclicked-option'}
            onClick={handleClick}>
            Skip
        </button>
      </div>
      <button id="next-button" className='bree-serif-regular' onClick={() => navigate('/survey')}>
        Next Question
      </button>
    </>
  )
}

export default Onboarding3
