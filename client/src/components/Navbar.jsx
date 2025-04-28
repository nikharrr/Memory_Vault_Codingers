import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

function Navbar({ onNavigate, currentPage }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(userData.full_name);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsSubDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  const handleCategorySelect = (category) => {
    setSearchCategory(category);
    setSelectedOption('');
    setIsDropdownOpen(false);
    setIsSubDropdownOpen(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsSubDropdownOpen(false);
  };

  const handleResetSearch = () => {
    setSearchCategory('');
    setSelectedOption('');
    setIsDropdownOpen(false);
    setIsSubDropdownOpen(false);
  };

  const tagsOptions = ['Nature', 'Family', 'Travel', 'Pets'];
  const peopleOptions = ['Alice', 'Bob', 'Charlie', 'Diana'];

  return (
    <div className="fixed top-4 left-0 right-0 flex justify-between items-center z-20 px-6">
      {/* Search Box */}
      {currentPage === 'home' && isLoggedIn && (
        <div className="flex justify-center w-full">
          <div ref={dropdownRef} className="relative w-full max-w-lg">
            {/* Search Bar */}
            <div
              className="flex items-center w-full px-4 py-2 bg-white/30 border backdrop-blur-md rounded-lg cursor-pointer"
              onClick={() => {
                if (!selectedOption) {
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
              style={{ marginLeft: '10%' }} // Shift the search bar a bit to the right
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-white mr-2" />
              <span className="text-white flex-1 truncate">
                {selectedOption || (searchCategory ? `Select a ${searchCategory.toLowerCase()}...` : 'Search by...')}
              </span>

              {(searchCategory || selectedOption) ? (
                <button onClick={handleResetSearch}>
                  <XMarkIcon className="w-5 h-5 text-white hover:text-yellow-300" />
                </button>
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-white ml-2" />
              )}
            </div>

            {/* Main Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white/30 backdrop-blur-md z-10 border border-white/30 rounded-none">
                <button
                  onClick={() => handleCategorySelect('Tags')}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-white/20"
                >
                  Search by Tags
                </button>
                <button
                  onClick={() => handleCategorySelect('People')}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-white/20"
                >
                  Search by People
                </button>
              </div>
            )}

            {/* Sub Dropdown */}
            {isSubDropdownOpen && searchCategory && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white/30 backdrop-blur-md z-10 border border-white/30 rounded-none">
                {(searchCategory === 'Tags' ? tagsOptions : peopleOptions).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-white/20"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Right side buttons */}
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
              {userName || 'Profile'}
            </button>

            <div className="absolute right-0 mt-1 w-48 bg-[#0d1321] border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
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
