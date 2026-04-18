import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Onboarding1 from './OnBoarding/Onboarding1.jsx'
import Onboarding2 from './OnBoarding/Onboarding2.jsx'
import Onboarding3 from './OnBoarding/Onboarding3.jsx'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding1" element={<Onboarding1 />} />
        <Route path="/onboarding2" element={<Onboarding2 />} />
        <Route path="/onboarding3" element={<Onboarding3 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)