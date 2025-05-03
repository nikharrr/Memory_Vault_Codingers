import { all } from 'axios';
import React,{ useState,useEffect } from 'react';
import MemoryPopup from '../components/MemoryPopup';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0,y: 20 },
  show: { opacity: 1,y: 0 }
};

function Home() {
  const [allMemories,setAllMemories] = useState([]);
  const [filteredMemories,setFilteredMemories] = useState([]);
  const [searchParams,setSearchParams] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [favorites,setFavorites] = useState(new Set());
  // Add state for popup
  const [selectedMemory,setSelectedMemory] = useState(null);
  const [isPopupOpen,setIsPopupOpen] = useState(false);

  const checkAuth = () => {
    const user = localStorage.getItem('user');
    return !!user;
  };

  const getPatientId = () => {
    const user = localStorage.getItem('user');
    const userData = user ? JSON.parse(user) : null;
    return userData ? userData.patient_id : null;
  };

  // Function to safely parse date strings (specifically for YYYY-MM-DD)
  const parseDate = (dateString) => {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const year = parseInt(dateParts[0],10);
      const month = parseInt(dateParts[1],10) - 1; // Month is 0-indexed in JavaScript
      const day = parseInt(dateParts[2],10);
      const date = new Date(year,month,day);
      if (!isNaN(date)) {
        return date;

      }
    }
    console.warn(`Invalid date format: ${dateString}`);
    return new Date('Invalid Date'); // Return an actual "Invalid Date" object
  };

  // Only fetch memories if authenticated
  const fetchAllMemories = async () => {
    if (!checkAuth()) return;

    const patientId = getPatientId();
    if (!patientId) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/memories/${patientId}`);
      if (!response.ok) throw new Error('Failed to fetch memories');

      const data = await response.json();
      const memoriesWithParsedDates = data.map(memory => ({
        ...memory,
        date: memory.memory_date ? parseDate(memory.memory_date) : new Date('Invalid Date'),
      }));
      setAllMemories(memoriesWithParsedDates);
      setFilteredMemories(memoriesWithParsedDates); // Initially show all memories
      setError(null);
    } catch (err) {
      console.error('Error fetching memories:',err);
      setError('Failed to load memories. Please try again.');
      setAllMemories([]);
      setFilteredMemories([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial favorites
  const fetchFavorites = async () => {
    const patientId = getPatientId();
    if (!patientId) return;

    try {
      const response = await fetch(`http://localhost:5000/memories/${patientId}/favorites`);
      if (!response.ok) throw new Error('Failed to fetch favorites');
      const data = await response.json();
      setFavorites(new Set(data.map(memory => memory.memory_id)));
    } catch (err) {
      console.error('Error fetching favorites:',err);
    }
  };

  // Handle search functionality
  const handleSearch = async () => {
    const searchData = localStorage.getItem('memorySearch');

    // If no search data exists (cleared or initial load)
    if (!searchData) {
      setSearchParams(null);

      // Ensure allMemories is populated before setting filteredMemories
      if (allMemories.length === 0) {
        await fetchAllMemories(); // Fetch memories if not already done
      }

      setFilteredMemories(allMemories); // Show ALL memories
      return;
    }
    const params = JSON.parse(searchData);
    setSearchParams(params);

    // If search params exist but are empty
    if (!params.category || !params.values?.length) {
      setFilteredMemories(allMemories); // Show ALL memories
      return;
    }

    // Only perform search if we have valid search parameters
    setLoading(true);
    try {
      const patientId = getPatientId();
      const query = new URLSearchParams({
        [params.category.toLowerCase()]: params.values.join(',')
      });

      const response = await fetch(
        `http://localhost:5000/${patientId}/search?${query}`
      );

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      // Parse the dates in the search results
      const searchedMemoriesWithParsedDates = data.map(memory => ({
        ...memory,
        date: memory.memory_date ? parseDate(memory.memory_date) : new Date('Invalid Date'),
      }));
      setFilteredMemories(searchedMemoriesWithParsedDates);
      setError(null);
    } catch (err) {
      console.error('Search error:',err);
      setError('Search failed. Please try again.');
      setFilteredMemories([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and setup event listeners
  useEffect(() => {
    fetchAllMemories();
    fetchFavorites();

    const handleMemoryUpdate = () => {
      fetchAllMemories(); // Refresh all memories when new memory is added
    };

    const handleMemorySearchUpdate = () => {
      handleSearch(); // Apply search when the event is triggered
    };

    const handleFavoritesUpdate = () => {
      fetchFavorites();
    };

    window.addEventListener('memoryAdded',handleMemoryUpdate);
    window.addEventListener('memorySearchUpdated',handleMemorySearchUpdate);
    window.addEventListener('favoritesUpdated',handleFavoritesUpdate);

    return () => {
      window.removeEventListener('memoryAdded',handleMemoryUpdate);
      window.removeEventListener('memorySearchUpdated',handleMemorySearchUpdate);
      window.removeEventListener('favoritesUpdated',handleFavoritesUpdate);
    };
  },[]);

  // Effect to reset filtered memories when search is cleared
  useEffect(() => {
    const searchData = localStorage.getItem('memorySearch');
    if (!searchData) {
      setSearchParams(null);
      setFilteredMemories(allMemories);
    } else {
      setSearchParams(JSON.parse(searchData));
    }
  },[allMemories]);

  // Group memories by month/year

  const getSortedMemoryGroups = () => {
    const groups = filteredMemories.reduce((acc,memory) => {
      const isValidDate = memory.date instanceof Date && !isNaN(memory.date);
      const monthYear = isValidDate
        ? memory.date.toLocaleString('default',{ month: 'long',year: 'numeric' })
        : 'Invalid Date';
      if (!acc[monthYear]) acc[monthYear] = [];
      acc[monthYear].push(memory);
      return acc;
    },{});

    return Object.entries(groups)
      .map(([monthYear,memories]) => ({
        monthYear,
        memories: memories.sort((a,b) => (b.date instanceof Date && !isNaN(b.date) && a.date instanceof Date && !isNaN(a.date)) ? b.date - a.date : 0),
        timestamp: memories[0]?.date instanceof Date && !isNaN(memories[0]?.date) ? memories[0].date : new Date('Invalid Date'),
      }))
      .sort((a,b) => (b.timestamp instanceof Date && !isNaN(b.timestamp) && a.timestamp instanceof Date && !isNaN(a.timestamp)) ? b.timestamp - a.timestamp : 0);
  };

  const renderSearchHeader = () => {
    if (searchParams?.category && searchParams?.values?.length > 0) {
      return (
        <div className="flex items-center ">
          <h2 className="text-3xl font-extrabold text-yellow-300 mb-2 mt-6">
            {filteredMemories.length > 0
              ? `${filteredMemories.length} Memories with ${searchParams.category === 'Tags' ? 'tags' : 'people'}: ${searchParams.values.join(', ')}`
              : `No memories found with selected ${searchParams.category.toLowerCase()}`}
          </h2>
        </div>
      );
    }
    return <h2 className="text-3xl ml-10 font-extrabold text-yellow-300 mb-2 mt-6">Your Memories</h2>;
  };

  const toggleFavorite = async (memoryId) => {
    const patientId = getPatientId();
    if (!patientId) return;

    try {
      const response = await fetch(`http://localhost:5000/memories/${patientId}/toggle-favorite/${memoryId}`,{
        method: 'PATCH',
      });

      if (!response.ok) throw new Error('Failed to toggle favorite');

      setFavorites(prev => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(memoryId)) {
          newFavorites.delete(memoryId);
        } else {
          newFavorites.add(memoryId);
        }
        return newFavorites;
      });

      // Dispatch event to notify ViewMemories component
      window.dispatchEvent(new Event('favoritesUpdated'));
    } catch (err) {
      console.error('Error toggling favorite:',err);
    }
  };

  const handleOpenMemory = async (memory) => {
    const patientId = getPatientId();
    if (!patientId) return;

    try {
      // Fetch detailed memory information
      const response = await fetch(`http://localhost:5000/memories/${patientId}/memory/${memory.memory_id}`);
      if (!response.ok) throw new Error('Failed to fetch memory details');

      const detailedMemory = await response.json();

      // Add favorite status and set in state
      setSelectedMemory({
        ...detailedMemory,
        favorite: favorites.has(memory.memory_id)
      });
      setIsPopupOpen(true);
    } catch (err) {
      console.error('Error fetching memory details:',err);
    }
  };

  const handleClosePopup = () => {
    setSelectedMemory(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen pt-10 flex flex-col items-center overflow-hidden">
      <div className="absolute top-26 w-full text-center bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-yellow-300 drop-shadow-md">
        <h1 className="text-xl font-bold tracking-normal">Welcome to Memory Vault ✨</h1>
      </div>

      {!checkAuth() ? null : (
        <div className="w-full mt-36 max-w-7xl px-4">
          {renderSearchHeader()}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-white text-xl">Loading memories...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-400 text-xl">{error}</p>
            </div>
          ) : (
            <>
              {(!searchParams?.category || !searchParams?.values?.length) && (
                <svg height="80" width="100%" className="-mb-12">
                  <path d="M 0 50 Q 50% 0 100% 50" stroke="white" strokeWidth="4" fill="transparent" />
                </svg>
              )}

              {filteredMemories.some(memory => isNaN(memory.date)) && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Warning!</strong>
                  <span className="block sm:inline"> Some memories have invalid dates. Please check your data.</span>
                </div>
              )}

              {filteredMemories.length === 0 && searchParams?.category && searchParams?.values?.length > 0 ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-white text-xl">No memories found with the selected criteria.</p>
                </div>
              ) : (
                <div className="w-full ml-10">
                  {getSortedMemoryGroups().map(({ monthYear,memories: monthMemories }) => (
                    <div key={monthYear} className="mb-12">
                      <h3 className="text-xl text-white mb-4">{monthYear}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {monthMemories.map(memory => (
                          <motion.div
                            key={memory.id}
                            className="relative flex flex-col items-center bg-[#faf5db54] p-1 rounded-xl shadow-lg border border-white/40"
                            variants={itemVariants}
                          >
                            <div
                              className="relative mb-2 w-[170px] h-[180px] border-1 border-white/40 rounded-lg overflow-hidden bg-white/40 cursor-pointer"
                              onClick={() => handleOpenMemory(memory)}
                            >
                              <img
                                src={memory.image_url || 'https://source.unsplash.com/150x200/?memory'}
                                alt={`Memory ${memory.id}`}
                                className="w-full h-full object-cover "
                                
                              />
                            </div>

                            <div className="w-full px-2 mb-2 flex items-center justify-between">
                              <h4 className="text-sm text-white truncate">{memory.title}</h4>
                              <button
                                onClick={() => toggleFavorite(memory.memory_id)}
                                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                                aria-label={favorites.has(memory.memory_id) ? "Remove from favorites" : "Add to favorites"}
                              >
                                {favorites.has(memory.memory_id) ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="red" stroke="red" strokeWidth="1" className="transition-colors">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="transition-colors">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                  </svg>
                                )}
                              </button>
                            </div>

                            {searchParams?.category && searchParams?.values?.length > 0 && (
                              <div className="w-full px-1">
                                {searchParams.category === 'Tags' && memory.tags?.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {memory.tags.map(tag => (
                                      <span
                                        key={tag}
                                        className={`text-xs px-2 py-1 rounded-full ${searchParams.values.includes(tag)
                                          ? 'bg-yellow-500 text-black'
                                          : 'bg-white/20 text-white'
                                          }`}
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                {searchParams.category === 'People' && memory.people?.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {memory.people.map(person => (
                                      <span
                                        key={person}
                                        className={`text-xs px-2 py-1 rounded-full ${searchParams.values.includes(person)
                                          ? 'bg-yellow-500 text-black'
                                          : 'bg-white/20 text-white'
                                          }`}
                                      >
                                        {person}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                    </div>
                  ))}
                  {filteredMemories.length === 0 && !searchParams?.category && !loading && !error && allMemories.length > 0 && (
                    <div className="flex justify-center items-center h-64">
                      <p className="text-white text-xl">No memories found.</p>
                    </div>
                  )}
                  {allMemories.length === 0 && !loading && !error && (
                    <div className="flex justify-center items-center h-64">
                      <p className="text-white text-xl">No memories available.</p>
                    </div>
                  )}
                </div>

              )}
            </>
          )}
        </div>
      )}

      {/* Add MemoryPopup component */}
      <MemoryPopup
        memory={selectedMemory}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />

    </div>
  );
}

export default Home;