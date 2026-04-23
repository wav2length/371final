import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../socket.js'
import RatingComponent from '../Components/RatingComponent.jsx'
import './Survey.css'

function Survey() {
  const navigate = useNavigate()
  const [selectedRating, setSelectedRating] = useState(null)
  const [questionIdx, setQuestionIdx] = useState(0)
  const [surveyResponses, setSurveyResponses] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const surveyTopics = [
    "playing sports",
    "watching sports",
    "exercising",
    "dining out",
    "going to a museum",
    "art",
    "hiking",
    "gaming",
    "going clubbing or dancing",
    "reading",
    "watching tv",
    "going to the theater",
    "watching movies",
    "going to concerts",
    "music",
    "shopping",
    "doing yoga"
  ];

  useEffect(() => {
    // Wait for server confirmation before navigating
    socket.on('survey-success', () => {
      setIsLoading(false)
      navigate('/career')
    })

    return () => socket.off('survey-success')
  }, [navigate])

  const handleSubmit = (finalResponses) => {
    const surveyObj = surveyTopics.reduce((obj, key, idx) => {
      obj[key] = finalResponses[idx]
      return obj
    }, {})
    setIsLoading(true)
    socket.emit('store-survey-results', JSON.stringify(surveyObj))
  }

  const handleNext = () => {
    if (!selectedRating) {
      setError('Please select a rating before continuing.')
      return
    }

    setError('')
    // shh the database technically has ratings out of 10 so I'm just hacking ts
    // hi polsley
    const newRating = selectedRating * 2  // scale 1-5 to 1-10 for the DB
    const updatedResponses = [...surveyResponses, newRating]
    setSurveyResponses(updatedResponses)
    setSelectedRating(null)

    if (questionIdx >= surveyTopics.length - 1) {
      handleSubmit(updatedResponses)
    } else {
      setQuestionIdx(questionIdx + 1)
    }
  }

  return (
    <>
    <div id="progress-container">
        <div id="progress-bar-survey1"></div>
    </div>
      <div id="main-area">
        <h1 id="Heading-survey1">How interested are you in:</h1>
        <h1 id="Heading-survey1">{surveyTopics[questionIdx]}</h1>
        <RatingComponent selected={selectedRating} setSelected={ rating => {setSelectedRating(rating); setError('') }}/>
        {error && <p style={{ color: 'red', marginTop: '12px', fontSize: '0.85rem' }}>{error}</p>}
      </div>
      <button id="next-button" className='bree-serif-regular' onClick={handleNext} disabled={isLoading}>
        {isLoading ? 'Saving...' : questionIdx >= surveyTopics.length - 1 ? 'Finish' : 'Next Question'}
      </button>
    </>
  )
}

export default Survey
