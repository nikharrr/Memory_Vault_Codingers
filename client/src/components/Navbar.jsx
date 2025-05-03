import { useState,useEffect,useRef } from 'react';
import { ChevronDownIcon,MagnifyingGlassIcon,XMarkIcon,CheckIcon } from '@heroicons/react/24/solid';

function Navbar({ onNavigate,currentPage }) {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userName,setUserName] = useState('');
  const [searchCategory,setSearchCategory] = useState('');
  const [selectedOptions,setSelectedOptions] = useState([]);
  const [isDropdownOpen,setIsDropdownOpen] = useState(false);
  const [isSubDropdownOpen,setIsSubDropdownOpen] = useState(false);
  const [tagsOptions,setTagsOptions] = useState([]);
  const [peopleOptions,setPeopleOptions] = useState([]);
  const [loadingOptions,setLoadingOptions] = useState(false);
  const [optionsError,setOptionsError] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const searchData = localStorage.getItem('memorySearch');
    if (searchData) {
      const { category,values } = JSON.parse(searchData);
      setSearchCategory(category);
      setSelectedOptions(values || []);
    }
  },[]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      const name = userData.full_name.split(' ');
      setUserName(name[0]);
    } else {
      setIsLoggedIn(false);
    }
  },[]);
  useEffect(() => {
    const fetchOptions = async () => {
      if (!isLoggedIn) return;

      const user = JSON.parse(localStorage.getItem('user'));
      const patientId = user ? user.patient_id : null;

      if (!patientId) return;

      setLoadingOptions(true);
      setOptionsError(null);

      try {
        const [tagsResponse,peopleResponse] = await Promise.all([
          fetch(`http://localhost:5000/${patientId}/tagsName`),
          fetch(`http://localhost:5000/${patientId}/peopleName`)
        ]);


        if (!tagsResponse.ok || !peopleResponse.ok) {
          throw new Error('Failed to fetch options');
        }

        const tagsData = await tagsResponse.json();
        const peopleData = await peopleResponse.json();
        console.log(tagsData,peopleData);
        setTagsOptions(tagsData);
        setPeopleOptions(peopleData);
      } catch (error) {
        console.error('Error fetching options:',error);
        setOptionsError('Failed to load search options');
        setTagsOptions([]);
        setPeopleOptions([]);
      } finally {
        setLoadingOptions(false);
      }
    };

    if (isLoggedIn) {
      fetchOptions();
    }
    fetchOptions();
  },[isLoggedIn]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsSubDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown',handleClickOutside);
    return () => {
      document.removeEventListener('mousedown',handleClickOutside);
    };
  },[]);

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
    setSelectedOptions([]);
    setIsDropdownOpen(false);
    setIsSubDropdownOpen(true);
  };

  const handleOptionToggle = (option) => {
    let newSelected;
    if (selectedOptions.includes(option)) {
      newSelected = selectedOptions.filter(item => item !== option);
    } else {
      newSelected = [...selectedOptions,option];
    }
    setSelectedOptions(newSelected);

    const searchParams = { category: searchCategory,values: newSelected };
    localStorage.setItem('memorySearch',JSON.stringify(searchParams));
  };

  const handleApplySearch = () => {
    setIsSubDropdownOpen(false);

    // Save search only when Apply is clicked
    if (selectedOptions.length === 0) {
      localStorage.removeItem('memorySearch');
    } else {
      const searchParams = {
        category: searchCategory,
        values: selectedOptions
      };
      localStorage.setItem('memorySearch',JSON.stringify(searchParams));
    }
    window.dispatchEvent(new Event('memorySearchUpdated'));

    if (currentPage !== 'home') {
      onNavigate('home');
    }
  };

  const handleResetSearch = () => {
    setSearchCategory('');
    setSelectedOptions([]);
    localStorage.removeItem('memorySearch');
    window.dispatchEvent(new Event('memorySearchUpdated'));
  };

  const formatSelectedText = () => {
    if (selectedOptions.length === 0) {
      return searchCategory ? `Select ${searchCategory.toLowerCase()}...` : 'Search by...';
    }
    if (selectedOptions.length === 1) {
      return `${searchCategory}: ${selectedOptions[0]}`;
    }
    return `${searchCategory}: ${selectedOptions.length} selected`;
  };

  return (
    <div className="fixed top-4 left-0 right-0 flex justify-between items-center z-20 px-6">
      {/* Search Box */}
      {currentPage === 'home' && isLoggedIn && (
        <div className="flex justify-center w-full">
          <div ref={dropdownRef} className="relative w-full max-w-2xl">
            {/* Search Bar */}
            <div
              className="flex items-center w-full px-6 py-2 bg-white/30 border border-white/40 backdrop-blur-md rounded-full cursor-pointer shadow-sm"
              onClick={() => {
                if (selectedOptions.length === 0) {
                  setIsDropdownOpen(!isDropdownOpen);
                  setIsSubDropdownOpen(false);
                } else if (searchCategory) {
                  setIsSubDropdownOpen(!isSubDropdownOpen);
                  setIsDropdownOpen(false);
                }
              }}
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-white mr-2" />
              <span className="text-white flex-1 truncate">
                {formatSelectedText()}
              </span>
              {(searchCategory || selectedOptions.length > 0) ? (
                <button onClick={handleResetSearch}>
                  <XMarkIcon className="w-4 h-2 text-white hover:text-yellow-300" />
                </button>
              ) : (
                <ChevronDownIcon
                  className={`w-5 h-5 text-white ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''
                    }`}
                />
              )}
            </div>

            {/* Main Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg z-10 overflow-hidden">
                <button
                  onClick={() => handleCategorySelect('Tags')}
                  className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 transition"
                >
                  Search by Tags
                </button>
                <button
                  onClick={() => handleCategorySelect('People')}
                  className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 transition"
                >
                  Search by People
                </button>
              </div>
            )}

            {/* Sub Dropdown */}
            {isSubDropdownOpen && searchCategory && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg z-10 overflow-hidden">
                {loadingOptions ? (
                  <div className="px-4 py-3 text-white text-center">Loading options...</div>
                ) : optionsError ? (
                  <div className="px-4 py-3 text-red-300 text-center">{optionsError}</div>
                ) : (
                  <>
                    <div className="max-h-[144px] overflow-y-auto">
                      {(searchCategory === 'Tags' ? tagsOptions : peopleOptions).map((option,index) => (
                        <div
                          key={index}
                          onClick={() => handleOptionToggle(option)}
                          className="flex items-center px-4 py-3 text-white hover:bg-white/10 transition cursor-pointer"
                        >
                          <div
                            className={`w-5 h-5 flex items-center justify-center mr-3 rounded ${selectedOptions.includes(option)
                              ? 'bg-yellow-400'
                              : 'border border-white'
                              }`}
                          >
                            {selectedOptions.includes(option) && (
                              <CheckIcon className="w-4 h-4 text-black" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>

                    {/* Apply Button */}
                    {selectedOptions.length > 0 && (
                      <div className="px-4 py-3 bg-white/10">
                        <button
                          onClick={handleApplySearch}
                          className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md transition"
                        >
                          Apply ({selectedOptions.length})
                        </button>
                      </div>
                    )}
                    {selectedOptions.length === 0 && searchCategory && (
                      <div className="px-4 py-3 bg-white/10">
                        <button
                          onClick={handleApplySearch}
                          className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition"
                        >
                          Show All
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Right Side Buttons */}
      <div className="flex gap-4 items-center ml-auto">
        <button
          onClick={() => {
            onNavigate('home');
            if (currentPage !== 'home') {
              handleResetSearch();
            }
          }}
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
            <div className="absolute right-0 mt-1 w-48 bg-[#0d1321] border border-white/20 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="py-1">
                <button
                  onClick={() => onNavigate('profile')}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 transition"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onNavigate('settings')}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 transition"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleAuth}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md font-semibold transition"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;