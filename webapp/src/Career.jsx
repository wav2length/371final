import { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from './socket.js'
import './Career.css'

function Career() {
  const [selectedCareerField, setSelectedCareerField] = useState(null)
  const navigate = useNavigate()
  
  const fields = [
    'Law', 'Academia', 'Psychology',
    'Medicine', 'Engineering', 'Creative',
    'Business', 'Real Estate', 'Humanitarian',
    'Social Work', 'Speech Pathology', 'Politics',
    'Athletics', 'Journalism', 'Architecture',
    'Other', 'Undecided'
]

const handleNext = () => {
  socket.emit('store-career-results', JSON.stringify(selectedCareerField))
  navigate('/onboarding-complete')
}

const handleClick = (field) => {
  setSelectedCareerField(selectedCareerField === field ? null : field) // toggles on/off
}

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
            className={selectedCareerField === field ? 'field-btn selected' : 'field-btn'}
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

export default Career
