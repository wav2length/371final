import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Onboarding1 from './OnBoarding/Onboarding1.jsx'
import Onboarding2 from './OnBoarding/Onboarding2.jsx'
import Onboarding3 from './OnBoarding/Onboarding3.jsx'
import OnboardingComplete from './OnBoarding/OnboardingComplete.jsx'
import Career from './Career.jsx'
import Survey from './Surveys/Survey.jsx'
import MatchesPage from './MatchesPage.jsx'
import MatchLoading from './MatchLoading.jsx'
import Chat from './Chat.jsx'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Onboarding pages */}
        <Route path="/onboarding1" element={<Onboarding1 />} />
        <Route path="/onboarding2" element={<Onboarding2 />} />
        <Route path="/onboarding3" element={<Onboarding3 />} />
        {/* survey rating questions */}
        <Route path="/survey" element={<Survey />} />
        {/* Career page  */}
        <Route path="/career" element={<Career />} />
        {/* End onboarding pages  */}
        <Route path="/onboarding-complete" element={<OnboardingComplete />} />
        {/* Matches and Chatting Pages */}
        <Route path="/MatchLoading" element={<MatchLoading />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)