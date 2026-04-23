import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../socket.js'
import './Onboarding4.css'

function Onboarding4() {  
  const navigate = useNavigate()
  const [selectedJoinReason, setSelectedJoinReason] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const fields = [
    'Joined for fun', 
    'Joined to meet people',
    'Joined to date',
    'Joined to find a relationship',
    'Joined to try the app',
    'Joined for other reasons'
]

useEffect(() => {
    // Server confirmed the user object was created, wait till succesful and then proceed to onboarding2
    socket.on('onboarding4-success', () => {
      // No longer loading
      setIsLoading(false)
      // Navigate to next step
      navigate('/survey')
    })

    // Clean the listener
    // Prevents hell-banishing the listener
    return () => {
      socket.off('onboarding4-success')
    }
  }, [navigate])

const handleNext = () => {
  if (selectedJoinReason === null) {
    setError('Please select a reason before continuing.')
    return
  }

  setError('')
  // Waiting on server response
  setIsLoading(true)
  // Sending information to server to store
  socket.emit('store-onboarding4-results', JSON.stringify(selectedJoinReason))
}

const handleClick = (field) => {
  setSelectedJoinReason(selectedJoinReason === field ? null : field) // toggles on/off
  setError('')
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
        {error && <p style={{ color: 'red', marginTop: '12px', fontSize: '0.85rem' }}>{error}</p>}
      </div>
      <button id="next-button-career" className='bree-serif-regular' onClick={handleNext} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Next Question'}
      </button>
    </>
  )
}

export default Onboarding4
