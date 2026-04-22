import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { socket } from './socket.js'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    // Error Check
    if (!firstName.trim()) {
      setError('Please enter your first name.')
      return
    }

    setIsLoading(true)
    setError('')

    // Server expects firstName+lastName as the username
    const username = `${firstName.trim()}${lastName.trim()}`
    socket.emit('login', username)
  }

  useEffect(() => {
    // Server found a matching user — skip onboarding, go to matchmaking
    socket.on('login-success', () => {
      setIsLoading(false)
      navigate('/matchmaking')
    })

    // Server found no matching user — send them to onboarding to create an account
    socket.on('login-failure', () => {
      setIsLoading(false)
      setError('No account found. Redirecting to onboarding...')
      navigate('/onboarding1')
    })

    // Clean up listeners when component unmounts to avoid duplicates
    return () => {
      socket.off('login-success')
      socket.off('login-failure')
    }
  }, [navigate])

  return (
    <>
      <div id="main-area-login">
        <h1 id="heading-login">Welcome Back</h1>
        <p id="subheading-login">First Name</p>
        <input
          id="input-text-login"
          type="text"
          placeholder="Enter your first name..."
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          // Submitting with Enter key
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        <p id="subheading-login">Last Name</p>
        <input
          id="input-text-login"
          type="text"
          placeholder="Enter your last name..."
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />

        {/* Only show error message if there is one */}
        {error && <p id="error-text-login">{error}</p>}
      </div>

      <button
        id="login-button"
        className='bree-serif-regular'
        onClick={handleLogin}
        // Disable the button
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Log In'}
      </button>

      {/* New user path — skip login and go straight to onboarding */}
      <button
        id="new-user-button"
        className='bree-serif-regular'
        onClick={() => navigate('/onboarding1')}
      >
        New User? Sign Up
      </button>
    </>
  )
}

export default Login