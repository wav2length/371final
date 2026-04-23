import { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../socket.js'
import './Onboarding4.css'

function Onboarding4() {
  const [selectedJoinReason, setSelectedJoinReason] = useState(null)
  const navigate = useNavigate()
  
  const fields = [
    'Joined for fun', 
    'Joined to meet people',
    'Joined to date',
    'Joined to find a relationship',
    'Joined to try the app',
    'Joined for other reasons'
]

const handleNext = () => {
  socket.emit('store-onboarding4-results', JSON.stringify(selectedJoinReason))
  navigate('/survey')
}

const handleClick = (field) => {
  setSelectedJoinReason(selectedJoinReason === field ? null : field) // toggles on/off
}

  return (
    <>
    <div id="progress-container-career">
        <div id="progress-bar-career"></div>
    </div>
      <div id="main-area-career">
        <h1 id="Heading-career">Why did you join Wavelength?</h1>
        <div id="fields-container">
        {fields.map((field) => (
            <button
            key={field}
            className={selectedJoinReason === field ? 'field-btn selected' : 'field-btn'}
            onClick={() => handleClick(field)}
            >
            {field}
            </button>
        ))}
        </div>

        
      </div>
      <button id="next-button-career" className='bree-serif-regular' onClick={handleNext}>
        Next Question
      </button>
    </>
  )
}

export default Onboarding4
