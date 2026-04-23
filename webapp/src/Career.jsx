import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from './socket.js'
import './Career.css'

function Career() {
  const navigate = useNavigate()
  const [selectedCareerField, setSelectedCareerField] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const fields = [
    'Law', 'Academia', 'Psychology',
    'Medicine', 'Engineering', 'Creative',
    'Business', 'Real Estate', 'Humanitarian',
    'Social Work', 'Speech Pathology', 'Politics',
    'Athletics', 'Journalism', 'Architecture',
    'Other', 'Undecided'
]

useEffect(() => {
    // Wait for server confirmation before navigating
    socket.on('career-success', () => {
      setIsLoading(false)
      navigate('/onboarding-complete')
    })

    // Socket has suffered a cessation of life signs :(
    return () => socket.off('career-success')
  }, [navigate])

  const handleNext = () => {
    if (selectedCareerField === null) {
      setError('Please select a career field before continuing.')
      return
    }

    setError('')
    setIsLoading(true)
    socket.emit('store-career-results', JSON.stringify(selectedCareerField))
  }

const handleClick = (field) => {
    setSelectedCareerField(selectedCareerField === field ? null : field)
    setError('')
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
        {error && <p style={{ color: 'red', marginTop: '12px', fontSize: '0.85rem' }}>{error}</p>}
      </div>
      <button id="next-button-career" className='bree-serif-regular' onClick={handleNext} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Next Question'}
      </button>
    </>
  )
}

export default Career
