import { useState, useEffect } from 'react';
import Fireflies from './components/Fireflies';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TransitionAnimation from './components/TransitionAnimation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ViewMemories from './pages/ViewMemories';
import ViewMemoryFromForm from './pages/ViewMemoryFromForm';
import AddMemory from './pages/AddMemory';
import MemoryDetail from './pages/MemoryDetail';
import ForgottenMemories from './pages/ForgottenMemories';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showStars, setShowStars] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [pageHistory, setPageHistory] = useState(['home']);

  // Initialize from localStorage and setup history
  useEffect(() => {
    const savedSettings = localStorage.getItem('memorySettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.isDarkMode);
    }

    // Initialize browser history
    window.history.replaceState({ page: 'home' }, '', window.location.pathname);
    
    // Set up popstate listener
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle theme change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Handle browser back/forward navigation
  const handlePopState = (event) => {
    if (event.state?.page) {
      setShowStars(true);
      setTimeout(() => {
        setCurrentPage(event.state.page);
        setShowStars(false);
      }, 800);
    }
  };

  // Main navigation function
  const handlePageChange = (page) => {
    setShowStars(true);
    setTimeout(() => {
      // Special handling for home page
      if (page === 'home') {
        setPageHistory(['home']); // Reset history array
        window.history.replaceState({ page: 'home' }, '', window.location.pathname);
      } else {
        setPageHistory(prev => [...prev, page]);
        window.history.pushState({ page }, '', `#${page}`);
      }
      
      setCurrentPage(page);
      setShowStars(false);
    }, 800);
  };



  // Go back function for Navbar
  const handleGoBack = () => {
    if (pageHistory.length > 1) {
      window.history.back();
    }
  };

  // Theme update function
  const updateTheme = (isDark) => {
    setIsDarkMode(isDark);
    const settings = JSON.parse(localStorage.getItem('memorySettings')) || {};
    settings.isDarkMode = isDark;
    localStorage.setItem('memorySettings', JSON.stringify(settings));
  };

  return (
    <div className={`relative w-screen min-h-screen ${isDarkMode ? 'bg-[#050A1F] text-white' : 'bg-[#f0f5ff] text-gray-800'} font-sans overflow-hidden`}>
      <Fireflies />
      
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-20">
        <Sidebar onNavigate={handlePageChange} />
        <Navbar onNavigate={handlePageChange} onGoBack={handleGoBack} />
      </div>
    
      {showStars && <TransitionAnimation />}
    
      <div className="flex flex-col items-center justify-center w-full min-h-screen px-6 pt-20 relative z-10">
        {currentPage === 'home' && <Home />}
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'viewMemories' && <ViewMemories />}
        {currentPage === 'viewMemoryFromForm' && <ViewMemoryFromForm />}
        {currentPage === 'addMemory' && <AddMemory />}
        {currentPage === 'memoryDetail' && <MemoryDetail />}
        {currentPage === 'forgottenMemories' && <ForgottenMemories />}
        {currentPage === 'settings' && <Settings updateTheme={updateTheme} />}
        {currentPage === 'login' && <Login onNavigate={handlePageChange} />}
        {currentPage === 'profile' && <Profile />}
      </div>
    </div>
  );
}

export default App;