import { use, useEffect, useState } from 'react'
import largeLogo from './Assets/large-logo.png'
import arrowLeft from './Assets/ArrowLeft.png'
import arrowRight from './Assets/ArrowRight.png'
import './MatchesPage.css'
import { socket } from './socket.js'
import { useNavigate } from 'react-router-dom'


function MatchesPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)

  // hardcoded profiles for testing purposes, will be replaced with actual data from backend
  const profiles = [
    { name: 'John Doe', age: 26, career: 'entertainment', interests: ['gaming', 'reading', 'concerts', 'yoga'], lookingFor: 'serious relationship' },
    { name: 'Jane Smith', age: 24, career: 'medicine', interests: ['hiking', 'cooking'], lookingFor: 'casual dating' },
    // add more profiles
  ]

  const current = profiles[currentIndex]

  return (
    <>
      {/* Design for home page */}
      <div id="page-match">
        <div id="heading-container-matches">
            <h1 id="Heading-matches">Meet your</h1>
            <img id="large-logo-matches" src={largeLogo} alt="Large Logo" />
        </div>
            {/* main center card */}
            <div className="main-card">
                <h2 id="Subheading-matches">{current.name}</h2>
                <p id="person-text">Age: {current.age}</p>
                <p id="person-text">Career: {current.career}</p>
                <p id="person-text">Interests: </p>
                <p id="person-text">{current.interests.join(', ')}</p>
                <p id="status-text">Looking for: {current.lookingFor}</p>
            </div>          
            <button id="chat-button" onClick={() => {navigate('/chat')}}>
              CHAT
            </button>
      </div>
    </>
  )
}

export default MatchesPage
