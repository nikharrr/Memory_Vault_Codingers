import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [memories, setMemories] = useState([]);
  const [searchParams, setSearchParams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get patient ID from localStorage or set a default for testing
  const getPatientId = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).id;
    }
    return 1; // Default patient ID for testing
  };

  // Fetch all memories when component mounts
  useEffect(() => {
    fetchMemories();
  }, []);

  // Handle search params changes
  useEffect(() => {
    const handleStorageChange = () => {
      const searchData = localStorage.getItem('memorySearch');
      if (searchData) {
        const params = JSON.parse(searchData);
        setSearchParams(params);
        
        if (params.category && params.values?.length > 0) {
          performSearch(params.category, params.values);
        } else {
          fetchMemories();
        }
      } else {
        setSearchParams(null);
        fetchMemories();
      }
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('memorySearchUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('memorySearchUpdated', handleStorageChange);
    };
  }, []);

  // Fetch all memories from the backend
  const fetchMemories = async () => {
    setLoading(true);
    try {
      const patientId = getPatientId();
      const response = await axios.get(`http://localhost:5000/memories/${patientId}`);
      
      // Transform the data to match the component's expected structure
      const transformedMemories = response.data.map(memory => ({
        id: memory.memory_id,
        src: memory.image_url || 'https://source.unsplash.com/150x200/?sunset', // Fallback image if none exists
        date: memory.memory_date,
        title: memory.title,
        tags: [], // Will be populated from a separate endpoint if needed
        people: [], // Will be populated from a separate endpoint if needed
        favorite: memory.favorite
      }));
      
      setMemories(transformedMemories);
      setError(null);
    } catch (err) {
      console.error('Error fetching memories:', err);
      setError('Failed to load memories. Please try again later.');
      setMemories([]);
    } finally {
      setLoading(false);
    }
  };

  // Perform search using backend API
  const performSearch = async (category, values) => {
    setLoading(true);
    try {
      const patientId = getPatientId();
      let response;
      
      if (category === 'Tags') {
        response = await axios.get(`http://localhost:5000/memories/${patientId}/search`, {
          params: { tags: values.join(',') }
        });
      } else if (category === 'People') {
        response = await axios.get(`http://localhost:5000/memories/${patientId}/search`, {
          params: { people: values.join(',') }
        });
      }
      
      // Transform the search results
      const transformedMemories = response.data.map(memory => ({
        id: memory.memory_id,
        src: memory.image_url || 'https://source.unsplash.com/150x200/?sunset',
        date: memory.memory_date,
        title: memory.title,
        tags: [], // These would need to be populated from a separate endpoint if needed
        people: [], // These would need to be populated from a separate endpoint if needed
        favorite: memory.favorite
      }));
      
      setMemories(transformedMemories);
      setError(null);
    } catch (err) {
      console.error('Error performing search:', err);
      setError('Search failed. Please try again.');
      setMemories([]);
    } finally {
      setLoading(false);
    }
  };

  const getSortedMemoryGroups = () => {
    const groups = memories.reduce((acc, memory) => {
      const monthYear = new Date(memory.date).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!acc[monthYear]) acc[monthYear] = [];
      acc[monthYear].push(memory);
      return acc;
    }, {});

    return Object.entries(groups)
      .map(([monthYear, memories]) => ({
        monthYear,
        memories: memories.sort((a, b) => new Date(b.date) - new Date(a.date)),
        timestamp: new Date(memories[0].date)
      }))
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  const renderSearchHeader = () => {
    if (searchParams?.category && searchParams?.values?.length > 0) {
      return (
        <div className="flex items-center mb-4">
          <h2 className="text-3xl font-extrabold text-yellow-300">
            {memories.length > 0
              ? `${memories.length} Memories with ${searchParams.category === 'Tags' ? 'tags' : 'people'}: ${searchParams.values.join(', ')}`
              : `No memories found with selected ${searchParams.category.toLowerCase()}`}
          </h2>
        </div>
      );
    }
    return <h2 className="text-3xl font-extrabold text-yellow-300 mb-8">Your Memories</h2>;
  };

  return (
    <div className="relative w-full min-h-screen pt-10 flex flex-col items-center overflow-hidden">
      {/* Welcome Message */}
      <div className="absolute top-0 w-full text-center bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl text-yellow-300 drop-shadow-md">
        <h1 className="text-xl font-bold tracking-normal">Welcome to Memory Moments ✨</h1>
      </div>

      {/* Memories Grid */}
      <div className="w-full mt-24 max-w-7xl px-4">
        {renderSearchHeader()}

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <p className="text-white text-xl">Loading memories...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-400 text-xl">{error}</p>
          </div>
        )}

        {/* Curved Divider */}
        {(!searchParams?.category || !searchParams?.values?.length) && !loading && !error && (
          <svg height="80" width="100%" className="-mb-12">
            <path d="M 0 50 Q 50% 0 100% 50" stroke="white" strokeWidth="4" fill="transparent" />
          </svg>
        )}

        {/* No Memories Found */}
        {!loading && !error && memories.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-white text-xl">No memories found. Try a different search.</p>
          </div>
        ) : !loading && !error && (
          <div className="w-full">
            {getSortedMemoryGroups().map(({ monthYear, memories: monthMemories }) => (
              <div key={monthYear} className="mb-12">
                <h3 className="text-xl text-white mb-4">{monthYear}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {monthMemories.map(memory => (
                    <div
                      key={memory.id}
                      className="relative flex flex-col items-center bg-[#faf5db54] p-1 rounded-xl shadow-lg border border-white/40"
                    >
                      <div className="relative mb-6 w-[170px] h-[180px] border-1 border-white/40 rounded-lg overflow-hidden bg-white/40">
                        <img
                          src={memory.src}
                          alt={`Memory ${memory.id}`}
                          className="w-full h-full object-cover"
                        />
                        {memory.favorite && (
                          <div className="absolute top-1 right-1 bg-yellow-500 text-xs text-black p-1 rounded-full">
                            ★ Favorite
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <div className="w-full px-2 mb-2">
                        <h4 className="text-sm text-white text-center truncate">{memory.title}</h4>
                      </div>

                      {/* Highlight selected Tags/People */}
                      {searchParams?.category && searchParams?.values?.length > 0 && (
                        <div className="w-full px-1">
                          {searchParams.category === 'Tags' && memory.tags && (
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
                          {searchParams.category === 'People' && memory.people && (
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
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;