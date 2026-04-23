import { useNavigate } from 'react-router-dom'
import largeLogo from './Assets/large-logo.png'
import waves from './Assets/waves.png'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <div id="home-page">
        <img id="large-logo" src={largeLogo} alt="Large Logo" />
        <p id='subtitle'>the dating app that </p>
        <p id='subtitle'>understands YOU first.</p>
        <button id='enter-button' onClick={() => {navigate('/login')}}>
          find someone on your wavelength today!</button>
        <img id="waves" src={waves} alt="Waves" />
      </div>
    </>
  )
}

export default Home
