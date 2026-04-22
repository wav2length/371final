import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './Home.jsx'
import Onboarding1 from './OnBoarding/Onboarding1.jsx'
import Onboarding2 from './OnBoarding/Onboarding2.jsx'
import Onboarding3 from './OnBoarding/Onboarding3.jsx'
import Onboarding4 from './OnBoarding/Onboarding4.jsx'
import OnboardingComplete from './OnBoarding/OnboardingComplete.jsx'
import Career from './Career.jsx'
import Survey from './Surveys/Survey.jsx'
import MatchesPage from './MatchesPage.jsx'
import MatchLoading from './MatchLoading.jsx'
import Chat from './Chat.jsx'
import Login from './Login.jsx'
import { useState, useEffect } from 'react'
import { socket } from './socket.js'

function App() {
  const [username, setUsername] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userPreference, setUserPreference] = useState('');

  const CAREER_MAP = {
    1: 'career_lawyer',
    2: 'career_academia',
    3: 'career_psychologist',
    4: 'career_medicine',
    5: 'career_engineer',
    6: 'career_creative_arts',
    7: 'career_business',
    8: 'career_real_estate',
    9: 'career_humanitarian_affairs',
    10: 'career_undecided',
    11: 'career_social_work',
    12: 'career_speech_pathology',
    13: 'career_politics',
    14: 'career_pro_sports',
    15: 'career_other',
    16: 'career_journalism',
    17: 'career_architecture'
  };

  const [newProgress, setNewProgress] = useState({
    timestamp: undefined,
    message: '', 
  })

  const [partner, setPartner] = useState('');
  const [messageHistory, setMessageHistory] = useState([])

  function loginWithUsername(username) {
    setUsername(username);
    socket.emit('login', username);
  }

  function enterMatchmaking() {
    if (username) {
      socket.emit('enter-matchmaking');
    } else {
      // User needs to log in with a username before entering matchmaking
      // Something with our navigation logic is wrong if this branch runs
    }
  }

  function sendMessage(content) {
    socket.emit('send-message', {
      timestamp: Date.now(),
      content: content
    });
  }

  useEffect(() => {
    socket.on('pong', () => {
      // expected to be more, socket.io sends multiple pings during testing
      setPong((pong) => pong + 1);
    });

    socket.on('login-success', () => {
      console.log(`Successfully registered as ${username}`);
    });

    socket.on('enter-matchmaking-success', () => {
      // TODO navigate to a progress page
      return;
    });
    socket.on('matchmaking-progress', update => {
      // useState is weird with objects so I don't think this actually works but I'll be responsible for fixing it later
      setNewProgress(update)
      return;
    });
    socket.on('matchmaking-failure', () => {
      // TODO show an alert
      return;
    });

    socket.on('enter-chat', partner => {
      // TODO what information do we want to show the user about their match?
      console.log("MATCHED!!!!!!!")
      setPartner(partner);
    });
    socket.on('receive-message', message => {
      setMessageHistory([...messageHistory, message]);
    });
    socket.on('partner-leave-chat', () => {
      // TODO show some sort of alert and navigate away from the chat
      return;
    });
  },[]);

    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />} />
            {/* Onboarding pages */}
            <Route path="/onboarding1" element={<Onboarding1 />} />
            <Route path="/onboarding2" element={<Onboarding2 />} />
            <Route path="/onboarding3" element={<Onboarding3 />} />
            <Route path="/onboarding4" element={<Onboarding4 />} />
            {/* survey rating questions */}
            <Route path="/survey" element={<Survey />} />
            {/* Career page  */}
            <Route path="/career" element={<Career />} />
            {/* End onboarding pages  */}
            <Route path="/onboarding-complete" element={<OnboardingComplete />} />
            {/* Matches and Chatting Pages */}
            <Route path="/matchmaking" element={<MatchLoading progressText={newProgress} />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/chat" element={<Chat partner={partner} />} />
            <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App