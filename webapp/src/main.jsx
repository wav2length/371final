import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Onboarding1 from './OnBoarding/Onboarding1.jsx'
import Onboarding2 from './OnBoarding/Onboarding2.jsx'
import Onboarding3 from './OnBoarding/Onboarding3.jsx'
import OnboardingComplete from './OnBoarding/OnboardingComplete.jsx'
import Career from './Career.jsx'
import Survey1 from './Surveys/Survey1.jsx'
import Survey2 from './Surveys/Survey2.jsx'
import Survey3 from './Surveys/Survey3.jsx'
import Survey4 from './Surveys/Survey4.jsx'
import Survey5 from './Surveys/Survey5.jsx'
import Survey6 from './Surveys/Survey6.jsx'
import Survey7 from './Surveys/Survey7.jsx'
import Survey8 from './Surveys/Survey8.jsx'
import Survey9 from './Surveys/Survey9.jsx'
import Survey10 from './Surveys/Survey10.jsx'
import Survey11 from './Surveys/Survey11.jsx'
import Survey12 from './Surveys/Survey12.jsx'
import Survey13 from './Surveys/Survey13.jsx'
import Survey14 from './Surveys/Survey14.jsx'
import Survey15 from './Surveys/Survey15.jsx'
import Survey16 from './Surveys/Survey16.jsx'
import Survey17 from './Surveys/Survey17.jsx'
import MatchesPage from './MatchesPage.jsx'
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
        <Route path="/survey1" element={<Survey1 />} />
        <Route path="/survey2" element={<Survey2 />} />
        <Route path="/survey3" element={<Survey3 />} />
        <Route path="/survey4" element={<Survey4 />} />
        <Route path="/survey5" element={<Survey5 />} />
        <Route path="/survey6" element={<Survey6 />} />
        <Route path="/survey7" element={<Survey7 />} />
        <Route path="/survey8" element={<Survey8 />} />
        <Route path="/survey9" element={<Survey9 />} />
        <Route path="/survey10" element={<Survey10 />} />
        <Route path="/survey11" element={<Survey11 />} />
        <Route path="/survey12" element={<Survey12 />} />
        <Route path="/survey13" element={<Survey13 />} />
        <Route path="/survey14" element={<Survey14 />} />
        <Route path="/survey15" element={<Survey15 />} />
        <Route path="/survey16" element={<Survey16 />} />
        <Route path="/survey17" element={<Survey17 />} />
        {/* Career page  */}
        <Route path="/career" element={<Career />} />
        {/* End onboarding pages  */}
        <Route path="/onboarding-complete" element={<OnboardingComplete />} />
        {/* Matches and Chatting Pages */}
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)