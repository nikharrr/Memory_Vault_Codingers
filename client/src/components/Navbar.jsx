import { useState, useEffect } from 'react';

function Navbar({ onNavigate }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log('UserData from localStorage:', userData); // Debug line (optional)
      setIsLoggedIn(true);
      setUserName(userData.full_name); // ✅ using full_name instead of name
    }
  }, []);

  const handleAuth = () => {
    if (isLoggedIn) {
      onNavigate('profile');
    } else {
      onNavigate('login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    onNavigate('home');
  };

  return (
    <div className="fixed top-4 right-6 flex gap-2 z-20">
      <button
        onClick={() => onNavigate('home')}
        className="text-white hover:text-yellow-300 font-semibold px-3 py-1"
      >
        Home
      </button>

      {isLoggedIn ? (
        <div className="relative group">
          <button
            onClick={handleAuth}
            className="text-white hover:text-yellow-300 font-semibold px-3 py-1 flex items-center"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {userName}
          </button>

          <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-[#0d1321] border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="py-1">
              <button
                onClick={() => onNavigate('profile')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-white/10"
              >
                View Profile
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="block w-full text-left px-4 py-2 text-white hover:bg-white/10"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-white hover:bg-white/10"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAuth}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded font-semibold transition-colors"
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Navbar;
