import { useNavigate } from 'react-router-dom'
import largeLogo from './Assets/large-logo.png'
import waves from './Assets/waves.png'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <div id="home-home-page">
        <img id="home-large-logo" src={largeLogo} alt="Large Logo" />
        <p id="home-subtitle">the dating app that </p>
        <p id="home-subtitle">understands YOU first.</p>
        <button id="home-enter-button" onClick={() => {navigate('/login')}}>
          find someone on your wavelength today!</button>
        <img id="home-waves" src={waves} alt="Waves" />
      </div>
    </>
  )
}

export default Home
