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
import EditMemory from './pages/EditMemory';
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

  // Handle initial load and browser navigation
  useEffect(() => {
    const handleNavigation = (skipAnimation = false) => {
      const hash = window.location.hash.slice(1) || 'home';
      const isAuthenticated = checkAuth();

      if (!isAuthenticated && hash !== 'login' && hash !== 'landing') {
        window.location.hash = '#landing';
        setCurrentPage('landing');
        return;
      }

      if (skipAnimation) {
        setCurrentPage(hash);
      } else {
        setShowStars(true);
        setTimeout(() => {
          setCurrentPage(hash);
          setShowStars(false);
        },800);
      }
    };

    // Handle browser back/forward buttons
    const handlePopState = () => {
      handleNavigation(true); // Skip animation for back/forward navigation
    };

    // Check authentication and set initial page
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.full_name);
    }

    // Set up browser navigation handling
    window.addEventListener('popstate',handlePopState);
    handleNavigation(); // Handle initial load

    // Load theme settings
    const savedSettings = localStorage.getItem('memorySettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.isDarkMode);
    }

    return () => {
      window.removeEventListener('popstate',handlePopState);
    };
  },[]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme',isDarkMode ? 'dark' : 'light');
  },[isDarkMode]);

  const handlePageChange = (page) => {
    // If user is not authenticated and trying to access protected routes
    if (!checkAuth() && page !== 'login' && page !== 'landing') {
      window.location.hash = '#landing';
      return;
    }

    setShowStars(true);
    setTimeout(() => {
      window.location.hash = `#${page}`;
      setShowStars(false);
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
          <Sidebar onNavigate={handlePageChange} isDarkMode={isDarkMode} />
          <Navbar onNavigate={handlePageChange} currentPage={currentPage} userName={userName} />
        </div>
      )}

      {showStars && <TransitionAnimation />}

      <div className="flex flex-col items-center justify-center w-full min-h-screen relative z-10">
        {!checkAuth() ? (
          currentPage === 'login' ? (
            <Login onNavigate={handlePageChange} isDarkMode={isDarkMode} />
          ) : (
            <LandingPage onNavigate={handlePageChange} isDarkMode={isDarkMode} />
          )
        ) : (
          <>
            {(!currentPage || currentPage === 'home') && <Home isDarkMode={isDarkMode} />}
            {currentPage === 'dashboard' && <Dashboard onNavigate={handlePageChange} isDarkMode={isDarkMode} />}
            {currentPage === 'viewMemories' && <ViewMemories isDarkMode={isDarkMode} />}
            {currentPage === 'addMemory' && <AddMemory isDarkMode={isDarkMode} />}
            {currentPage === 'memoryDetail' && <MemoryDetail isDarkMode={isDarkMode} />}
            {currentPage === 'forgottenMemories' && <ForgottenMemories isDarkMode={isDarkMode} />}
            {currentPage === 'settings' && <Settings updateTheme={updateTheme} isDarkMode={isDarkMode} />}
            {currentPage === 'profile' && <Profile isDarkMode={isDarkMode} />}
            {currentPage === 'editMemory' && <EditMemory isDarkMode={isDarkMode} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
