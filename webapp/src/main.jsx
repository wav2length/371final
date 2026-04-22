import { StrictMode } from 'react'
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
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)