import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Onboarding1 from './OnBoarding/Onboarding1.jsx'
import Onboarding2 from './OnBoarding/Onboarding2.jsx'
import Onboarding3 from './OnBoarding/Onboarding3.jsx'
import Onboarding4 from './OnBoarding/Onboarding4.jsx'
import OnboardingComplete from './OnBoarding/OnboardingComplete.jsx'
import Career from './Career.jsx'
import Survey from './Surveys/Survey.jsx'
import MatchLoading from './MatchLoading.jsx'
import Chat from './Chat.jsx'
import Login from './Login.jsx'
import { useState } from 'react'

function App() {
  const [newProgress, setNewProgress] = useState({ timestamp: undefined, message: '' })
  const [partner, setPartner] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding1" element={<Onboarding1 />} />
        <Route path="/onboarding2" element={<Onboarding2 />} />
        <Route path="/onboarding3" element={<Onboarding3 />} />
        <Route path="/onboarding4" element={<Onboarding4 />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/career" element={<Career />} />
        <Route path="/onboarding-complete" element={<OnboardingComplete />} />
        <Route path="/matchmaking" element={<MatchLoading progressText={newProgress} setPartner={setPartner} />} />
        <Route path="/chat" element={<Chat partner={partner} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App