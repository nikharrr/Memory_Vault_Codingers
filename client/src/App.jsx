import { useState,useEffect } from 'react';
import Fireflies from './components/Fireflies';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TransitionAnimation from './components/TransitionAnimation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ViewMemories from './pages/ViewMemories';
import AddMemory from './pages/AddMemory';
import MemoryDetail from './pages/MemoryDetail';
import ForgottenMemories from './pages/ForgottenMemories';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import './index.css';

function App() {
  const [currentPage,setCurrentPage] = useState('');
  const [showStars,setShowStars] = useState(false);
  const [isDarkMode,setIsDarkMode] = useState(true);
  const [userName,setUserName] = useState('');

  const checkAuth = () => {
    const user = localStorage.getItem('user');
    return !!user;
  };

  useEffect(() => {
    // Check authentication and set initial page
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.full_name);
      setCurrentPage('home'); // Set to home when logged in
    } else {
      setCurrentPage('landing'); // Set to landing when not logged in
    }

    const savedSettings = localStorage.getItem('memorySettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.isDarkMode);
    }
  },[]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme',isDarkMode ? 'dark' : 'light');
  },[isDarkMode]);

  const handlePageChange = (page) => {
    // If user is not authenticated and trying to access protected routes
    if (!checkAuth() && page !== 'login' && page !== 'landing') {
      setCurrentPage('landing');
      return;
    }

    setShowStars(true);
    setTimeout(() => {
      setCurrentPage(page);
      setShowStars(false);
      window.history.pushState({ page },'',`#${page}`);
    },800);
  };

  const updateTheme = (isDark) => {
    setIsDarkMode(isDark);
    const settings = JSON.parse(localStorage.getItem('memorySettings')) || {};
    settings.isDarkMode = isDark;
    localStorage.setItem('memorySettings',JSON.stringify(settings));
  };

  return (
    <div className={`relative w-screen min-h-screen ${isDarkMode ? 'bg-[#050A1F] text-white' : 'bg-[#f0f5ff] text-gray-800'} font-sans overflow-hidden`}>
      <Fireflies />
      {checkAuth() && (
        <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-20">
          <Sidebar onNavigate={handlePageChange} />
          <Navbar onNavigate={handlePageChange} currentPage={currentPage} userName={userName} />
        </div>
      )}

      {showStars && <TransitionAnimation />}

      <div className="flex flex-col items-center justify-center w-full min-h-screen relative z-10">
        {!checkAuth() ? (
          currentPage === 'login' ? (
            <Login onNavigate={handlePageChange} />
          ) : (
            <LandingPage onNavigate={handlePageChange} />
          )
        ) : (
          <>
            {(!currentPage || currentPage === 'home') && <Home />}
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'viewMemories' && <ViewMemories />}
            {currentPage === 'addMemory' && <AddMemory />}
            {currentPage === 'memoryDetail' && <MemoryDetail />}
            {currentPage === 'forgottenMemories' && <ForgottenMemories />}
            {currentPage === 'settings' && <Settings updateTheme={updateTheme} />}
            {currentPage === 'profile' && <Profile />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
