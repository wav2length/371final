import { useEffect, useState } from 'react'
import './Onboarding3.css'
import { socket } from '../socket.js'
import { useNavigate } from 'react-router-dom'

function Onboarding3() {
  const navigate = useNavigate()
  const [age, setAge] = useState(18)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Server confirmed the user object was created, wait till succesful and then proceed to onboarding2
    socket.on('onboarding3-success', () => {
      // No longer loading
      setIsLoading(false)
      // Navigate to next step
      navigate('/onboarding4')
    })

    // Clean the listener
    // Prevents portalling the listener to the moon
    return () => {
      socket.off('onboarding3-success')
    }
  }, [navigate])

  const handleNext = () => {
    // Get Age
    const parsedAge = parseInt(age, 10)
    
    // Age not right
    if (isNaN(parsedAge)) {
      setError('Please enter a valid age.')
      return
    }

    // Close enough
    if (parsedAge < 18) {
      setError('You must be at least 18 to use Wavelength.')
      return
    }

    if (parsedAge > 120) {
      setError('Real funny lying to the Ministry of Truth, now face the wall')
      return
    }

    setError('')
    // Waiting for server response set true
    setIsLoading(true)
    // Send data to storage
    socket.emit('store-onboarding3-results', JSON.stringify(parsedAge))
  }

  return (
    <>
    <div id="onboarding3-progress-container">
        <div id="onboarding3-progress-bar-board3"></div>
    </div>
      <div id="onboarding3-main-area">
        <h1 id="onboarding3-Heading-board3">Tell Us About Yourself</h1>
        <h2 id="onboarding3-subheading-board3">How old are you?</h2>
        <div id="onboarding3-options-container">
            <input id="onboarding3-input-num" type="number" min="18" max="120" value={age} onChange={(e) => { setAge(e.target.value); setError('') }}
              onBlur={() => {
              const parsed = parseInt(age, 10)
              if (isNaN(parsed) || parsed < 18) setAge(18)
              else if (parsed > 120) setAge(120)
              else setAge(parsed)
            }}/>  
        </div>
        {error && <p style={{ color: 'red', marginTop: '12px', fontSize: '0.85rem' }}>{error}</p>}
      </div>
      <button id="onboarding3-next-button" className='bree-serif-regular' onClick={handleNext} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Next Question'}
      </button>
    </>
  )
}

export default Onboarding3
