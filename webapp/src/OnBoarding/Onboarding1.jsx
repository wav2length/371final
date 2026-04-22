import { use, useEffect, useState } from 'react'
import './Onboarding1.css'
import { socket } from '../socket.js'
import { useNavigate } from 'react-router-dom'

function Onboarding1() {
  const navigate = useNavigate()

  // Define the firstName state variable and the set function for it
  const [firstName, setFirstName] = useState('')
  // Define the lastName state variable and the set function for it
  const [lastName, setLastName] = useState('')
  // Define the gender state variable and the set function for it
  const [gender, setGender] = useState('')
  // Define the pronouns state variable and the set function for it
  const [pronouns, setPronouns] = useState('')

  // Funtion that handles when the user clicks the next button
  const handleNext = () => {
    // Check if last name was filled out
    if (lastName === ""){
      lastName = "Last name not given"
    }
    // Check if pronouns were filled out
    if(pronouns === ""){
      pronouns = "No stated pronouns"
    }
    // Send information back to the server
    socket.emit('store-onboarding1-results', JSON.stringify({firstName, lastName, pronouns}))

    // Go to the next step of onboarding
    navigate('/Onboarding2')
  }

  return (
    <>
    <div id="progress-container">
        <div id="progress-bar-board1"></div>
    </div>
      <div id="main-area">
        <h1 id="Heading-board1">Tell Us About Yourself</h1>
        <p id="subheading-board1">First Name</p>
        <input value={firstName} onChange={e => setFirstName(e.target.value)} id="input-text" type="text" placeholder="Enter your first name here..." required/>
        <p id="subheading-board1">Last Name</p>
        <input value={lastName} onChange={e => setLastName(e.target.value)} id="input-text" type="text" placeholder="Enter your last name here..."/>
        <p id="subheading-board1">Gender</p>
        <input value={gender} onChange={e => setGender(e.target.value)} id="input-text" type="text" placeholder="Enter your gender here... " required/>
        <p id="subheading-board1">Pronouns</p>
        <input value={pronouns} onChange={e => setPronouns(e.target.value)} id="input-text" type="text" placeholder="Enter your pronouns here... "/>
      </div>
      <button id="next-button" className='bree-serif-regular' onClick={handleNext}>
        Next Question
      </button>
    </>
  )
}

export default Onboarding1
