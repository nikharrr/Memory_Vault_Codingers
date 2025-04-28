import { useState, useEffect } from 'react';
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
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showStars, setShowStars] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedSettings = localStorage.getItem('memorySettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.isDarkMode);
    }

    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.full_name);
    }

    // Handle browser back/forward button
    const handlePopState = () => {
      const pageFromHash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(pageFromHash);
    };

    window.addEventListener('popstate', handlePopState);

    // Set initial page from URL if available
    handlePopState();

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handlePageChange = (page) => {
    setShowStars(true);
    setTimeout(() => {
      setCurrentPage(page);
      setShowStars(false);
      window.history.pushState({ page }, '', `#${page}`);
    }, 800);
  };

  const updateTheme = (isDark) => {
    setIsDarkMode(isDark);
    const settings = JSON.parse(localStorage.getItem('memorySettings')) || {};
    settings.isDarkMode = isDark;
    localStorage.setItem('memorySettings', JSON.stringify(settings));
  };

  // Fallback to 'home' if currentPage somehow is blank
  const pageToRender = currentPage || 'home';

  return (
    <div className={`relative w-screen min-h-screen ${isDarkMode ? 'bg-[#050A1F] text-white' : 'bg-[#f0f5ff] text-gray-800'} font-sans overflow-hidden`}>
      <Fireflies />

      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-20">
        <Sidebar onNavigate={handlePageChange} />
        <Navbar onNavigate={handlePageChange} currentPage={pageToRender} userName={userName} />
      </div>

      {showStars && <TransitionAnimation />}

      <div className="flex flex-col items-center justify-center w-full min-h-screen px-6 pt-20 relative z-10">
        {pageToRender === 'home' && <Home />}
        {pageToRender === 'dashboard' && <Dashboard />}
        {pageToRender === 'viewMemories' && <ViewMemories />}
        {pageToRender === 'addMemory' && <AddMemory />}
        {pageToRender === 'memoryDetail' && <MemoryDetail />}
        {pageToRender === 'forgottenMemories' && <ForgottenMemories />}
        {pageToRender === 'settings' && <Settings updateTheme={updateTheme} />}
        {pageToRender === 'login' && <Login onNavigate={handlePageChange} />}
        {pageToRender === 'profile' && <Profile />}
      </div>
    </div>
  );
}

export default App;
