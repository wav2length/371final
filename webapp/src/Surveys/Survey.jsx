import { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../socket.js'
import RatingComponent from '../Components/RatingComponent.jsx'
import './Survey.css'

function Survey(setSurveyResponses) {
  const navigate = useNavigate()
  const [selectedRating, setSelectedRating] = useState(0)
  const [questionIdx, setQuestionIdx] = useState(0)

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

  return (
    <>
    <div id="progress-container">
        <div id="progress-bar-survey1"></div>
    </div>
      <div id="main-area">
        <h1 id="Heading-survey1">How interested are you in:</h1>
        <h1 id="Heading-survey1">{surveyTopics[questionIdx]}</h1>
        <RatingComponent selected={selectedRating} setSelected={setSelectedRating} />
      </div>
      <button id="next-button" className='bree-serif-regular' onClick={() => {
        if (questionIdx < surveyTopics.length - 1) {
          // TODO record answer

          setQuestionIdx(questionIdx + 1);
          setSelectedRating(null)
        } else {
          navigate('/career')
        }
      }}>
        Next Question
      </button>
    </>
  )
}

export default Survey
