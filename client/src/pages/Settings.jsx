import { useState,useEffect } from 'react';

function Settings({ updateTheme }) {
  const [isDarkMode,setIsDarkMode] = useState(true);
  const [notificationsEnabled,setNotificationsEnabled] = useState(true);
  const [fontSize,setFontSize] = useState('medium');
  const [showSaved,setShowSaved] = useState(false);

  useEffect(() => {
    // Check if there are saved settings in localStorage
    const savedSettings = localStorage.getItem('memorySettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setIsDarkMode(settings.isDarkMode);
      setNotificationsEnabled(settings.notificationsEnabled);
      setFontSize(settings.fontSize);
    }
  },[]);

  // Apply theme changes to the app
  useEffect(() => {
    // Update localStorage with all settings
    const settings = {
      isDarkMode,
      notificationsEnabled,
      fontSize
    };
    localStorage.setItem('memorySettings',JSON.stringify(settings));

    // Call the callback to update the app-level theme
    if (updateTheme) {
      updateTheme(isDarkMode);
    }
  },[isDarkMode,notificationsEnabled,fontSize,updateTheme]);

  const saveSettings = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false),2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-yellow-300' : 'text-blue-600'}`}>Settings</h2>

      <div className={`${isDarkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white border border-gray-200 shadow-md'} rounded-xl p-6 mb-6`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Appearance</h3>

        <div className="flex justify-between items-center mb-6">
          <label className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Theme Mode</label>
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
          <label className={`block mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Font Size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className={`w-full rounded-md p-2 ${isDarkMode ? 'bg-white/10 border border-white/20 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </div>
      </div>

      <div className={`${isDarkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white border border-gray-200 shadow-md'} rounded-xl p-6 mb-6`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Notifications</h3>

        <div className="flex justify-between items-center mb-6">
          <label className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Enable Notifications</label>
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

      <div className={`${isDarkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white border border-gray-200 shadow-md'} rounded-xl p-6 mb-6`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Account</h3>
        <button className={`w-full py-2 rounded-md mb-4 ${isDarkMode ? 'bg-red-500/30 hover:bg-red-500/50 text-white border border-red-500/50' : 'bg-red-100 hover:bg-red-200 text-red-700 border border-red-200'}`}>
          Delete All Memories
        </button>
        <button className={`w-full py-2 rounded-md ${isDarkMode ? 'bg-red-600/30 hover:bg-red-600/50 text-white border border-red-600/50' : 'bg-red-200 hover:bg-red-300 text-red-800 border border-red-300'}`}>
          Log Out
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={saveSettings}
          className={`px-6 py-2 rounded-md ${isDarkMode ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          Save Settings
        </button>

        {showSaved && (
          <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg ${isDarkMode ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'}`}>
            Settings saved successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;