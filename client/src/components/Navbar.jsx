import { useState, useEffect } from 'react';

function Navbar({ onNavigate, currentPage }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(userData.full_name); // Use full_name instead of name
    } else {
      setIsLoggedIn(false); // No user, logged out state
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      onNavigate('search', searchQuery);
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 flex items-center z-20 px-6">
      {/* Centered Search Bar only on Home Page */}
      {currentPage === 'home' && (
        <div className="flex justify-center w-full mx-8">
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-white/30 border border-yellow-300 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 backdrop-blur-md"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Right side: Home Button and Login/Profile */}
      <div className="flex gap-4 items-center ml-auto">
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
              {userName ? userName : 'Profile'} {/* Display profile name here */}
            </button>

            {/* Dropdown menu for logged-in user */}
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
    </div>
  );
}

export default Navbar;
