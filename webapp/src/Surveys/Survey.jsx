import { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from '../socket.js'
import RatingComponent from '../Components/RatingComponent.jsx'
import './Survey.css'

function Survey() {
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
  const [surveyResponses, setSurveyResponses] = useState([])

  const handleNext = (finalResponses) => {
    const surveyObj = surveyTopics.reduce((obj, key, idx) => {
      obj[key] = finalSurveyResponses[idx];
      return obj;
    }, {});
    socket.emit('store-survey-results', JSON.stringify(surveyObj))
    navigate('/career')
  }

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
        // shh the database technically has ratings out of 10 so I'm just hacking ts
        // hi polsley
        const newRating = selectedRating ? selectedRating * 2 : 1
        const updatedResponses = [...surveyResponses, newRating]
        setSurveyResponses(updatedResponses)
        setQuestionIdx(questionIdx + 1)
        setSelectedRating(null)
        if (questionIdx >= surveyTopics.length - 1) {
          handleNext(updatedResponses)  // pass it directly
        }
      }}>
        Next Question
      </button>
    </>
  )
}

export default Survey
