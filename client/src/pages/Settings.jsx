import { useState, useEffect } from 'react';

function Settings({ updateTheme }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const [animationSpeed, setAnimationSpeed] = useState('normal');
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    // Check if there are saved settings in localStorage
    const savedSettings = localStorage.getItem('memorySettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.isDarkMode);
      setNotificationsEnabled(settings.notificationsEnabled);
      setFontSize(settings.fontSize);
      setAnimationSpeed(settings.animationSpeed);
    }
  }, []);

  // Apply theme changes to the app
  useEffect(() => {
    // Update localStorage with all settings
    const settings = {
      isDarkMode,
      notificationsEnabled,
      fontSize,
      animationSpeed
    };
    localStorage.setItem('memorySettings', JSON.stringify(settings));
    
    // Call the callback to update the app-level theme
    if (updateTheme) {
      updateTheme(isDarkMode);
    }
  }, [isDarkMode, notificationsEnabled, fontSize, animationSpeed, updateTheme]);

  const saveSettings = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-300 mb-8 text-center">Settings</h2>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Appearance</h3>
        
        <div className="flex justify-between items-center mb-6">
          <label className="text-gray-200">Theme Mode</label>
          <div className="relative inline-block w-12 h-6">
            <input 
              type="checkbox" 
              className="opacity-0 w-0 h-0" 
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <span 
              className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-yellow-500' : 'bg-gray-400'}`}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <span 
                className={`absolute h-4 w-4 top-1 bg-white rounded-full transition-all duration-300 ${isDarkMode ? 'left-7' : 'left-1'}`}
              ></span>
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-200 mb-2">Font Size</label>
          <select 
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-200 mb-2">Animation Speed</label>
          <select 
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white"
          >
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
            <option value="none">No Animations</option>
          </select>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Notifications</h3>
        
        <div className="flex justify-between items-center mb-6">
          <label className="text-gray-200">Enable Notifications</label>
          <div className="relative inline-block w-12 h-6">
            <input 
              type="checkbox" 
              className="opacity-0 w-0 h-0" 
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            />
            <span 
              className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${notificationsEnabled ? 'bg-yellow-500' : 'bg-gray-400'}`}
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            >
              <span 
                className={`absolute h-4 w-4 top-1 bg-white rounded-full transition-all duration-300 ${notificationsEnabled ? 'left-7' : 'left-1'}`}
              ></span>
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Account</h3>
        <button className="w-full bg-red-500/30 hover:bg-red-500/50 text-white py-2 rounded-md border border-red-500/50 mb-4">
          Delete All Memories
        </button>
        <button className="w-full bg-red-600/30 hover:bg-red-600/50 text-white py-2 rounded-md border border-red-600/50">
          Log Out
        </button>
      </div>

      <div className="text-center">
        <button 
          onClick={saveSettings}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-md"
        >
          Save Settings
        </button>
        
        {showSaved && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
            Settings saved successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;