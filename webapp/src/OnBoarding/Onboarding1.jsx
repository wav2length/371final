import {useEffect, useState } from 'react'
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
  // Define the error state variable and the set function for it
  const [error, setError] = useState('')
  // Define the isLoading state variable and the set function for it
  // Lockout to prevent double clicking while waiting on the server
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    // Server confirmed the user object was created, wait till succesful and then proceed to onboarding2
    socket.on('onboarding1-success', () => {
      // No longer loading
      setIsLoading(false)
      // Navigate to next step
      navigate('/onboarding2')
    })

    // Clean the listener
    // Prevents backrooming the listener
    return () => {
      socket.off('onboarding1-success')
    }
  }, [navigate])


  const handleNext = () => {

    // First Name is required
    if(!firstName.trim()){
      setError('Please enter your first name before continuing')
      return
    }

    // Last Name is required
    if(!lastName.trim()){
      setError('Please enter your last name before continuing')
      return
    }

    const finalPronouns = pronouns.trim() || "No stated pronouns"

    // Waiting on response from server due to socket message
    setIsLoading(true)
    // Send information back to the server
    socket.emit('store-onboarding1-results', JSON.stringify({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      gender: gender.trim(),
      pronouns: finalPronouns
    }))
  }

  return (
    <>
    <div id="progress-container">
        <div id="progress-bar-board1"></div>
    </div>
      <div id="main-area">
        <h1 id="Heading-board1">Tell Us About Yourself</h1>
        <p id="subheading-board1">First Name</p>
        <input value={firstName} onChange={e => {setFirstName(e.target.value); setError('')}} id="input-text" type="text" placeholder="Enter your first name here..." required/>
        <p id="subheading-board1">Last Name</p>
        <input value={lastName} onChange={e => {setLastName(e.target.value); setError('')}} id="input-text" type="text" placeholder="Enter your last name here..." required/>
        <p id="subheading-board1">Gender</p>
        <select id="gender-dropdown" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p id="subheading-board1">Pronouns</p>
        <input value={pronouns} onChange={e => setPronouns(e.target.value)} id="input-text" type="text" placeholder="Enter your pronouns here... "/>
      </div>
      {error && <p style={{ color: 'red', fontSize: '0.85rem' }}>{error}</p>}
      <button id="next-button" className='bree-serif-regular' onClick={handleNext} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Next Question'}
      </button>
    </>
  )
}

export default Onboarding1
