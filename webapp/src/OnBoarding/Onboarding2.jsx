import {useEffect, useState } from 'react'
import './Onboarding2.css'
import { socket } from '../socket.js'
import { useNavigate } from 'react-router-dom'

function Onboarding2() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    // Wait for server confirmation before proceeding
    socket.on('onboarding2-success', () => {
      setIsLoading(false)
      navigate('/onboarding3')
    })

    return () => {
      socket.off('onboarding2-success')
    }
  }, [navigate])

  const handleNext = () => {
    // Must have preference
    if (selected === null) {
      setError('Please select an option before continuing.')
      return
    }

    setError('')
    setIsLoading(true)
    socket.emit('store-onboarding2-results', JSON.stringify(selected))
  }

  return (
    <>
    <div id="progress-container">
        <div id="progress-bar-board2"></div>
    </div>
      <div id="main-area">
        <h1 id="Heading-board2">Tell Us About Yourself</h1>
        <h2 id="subheading-board2">Do you have a gender preference?</h2>
        <div id="options-container">
             <button id={selected === 'female' ? 'clicked-option' : 'unclicked-option'}
                onClick={() => { setSelected('female'); setError('') }}>
                Yes, female
            </button>

            <button id={selected === 'male' ? 'clicked-option' : 'unclicked-option'}
                onClick={() => { setSelected('male'); setError('') }}>
                Yes, male
            </button>
            <button id={selected === 'no-preference' ? 'clicked-option' : 'unclicked-option'}
                onClick={() => { setSelected('no-preference'); setError('') }}>
                No preference
            </button>
        </div>
        {error && <p style={{ color: 'red', marginTop: '12px', fontSize: '0.85rem' }}>{error}</p>}
      </div>
      <button id="next-button" className='bree-serif-regular' onClick={handleNext}>Next Question</button>
    </>
  )
}

export default Onboarding2
