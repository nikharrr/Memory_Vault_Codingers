import React, { useState, useEffect } from 'react';



function Home() {
  // Expanded dummy memory data

  const allMemories = [
    { id: 1, src: 'https://source.unsplash.com/150x200/?sunset', date: '2024-01-15', tags: ['Nature', 'Travel'], people: ['Alice', 'Bob'] },
    { id: 2, src: 'https://source.unsplash.com/150x200/?sunset', date: '2024-02-22', tags: ['Nature'], people: ['Charlie'] },
    { id: 3, src: 'https://source.unsplash.com/150x200/?picnic', date: '2024-01-10', tags: ['Family'], people: ['Alice', 'Diana'] },
    { id: 4, src: 'https://source.unsplash.com/150x200/?forest', date: '2024-03-05', tags: ['Nature', 'Travel'], people: ['Bob'] },
    { id: 5, src: 'https://source.unsplash.com/150x200/?mountain', date: '2024-02-12', tags: ['Nature', 'Travel'], people: ['Charlie', 'Diana'] },
    { id: 6, src: 'https://source.unsplash.com/150x200/?lake', date: '2024-01-30', tags: ['Nature', 'Family'], people: ['Alice', 'Bob', 'Charlie'] },
  ];

  const [memories, setMemories] = useState(allMemories);
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const searchData = localStorage.getItem('memorySearch');
      if (searchData) {
        const params = JSON.parse(searchData);
        setSearchParams(params);

        if (params.category === 'Tags' && params.values?.length > 0) {
          const filtered = allMemories.filter(memory =>
            memory.tags.some(tag => params.values.includes(tag))
          );
          setMemories(filtered);
        } else if (params.category === 'People' && params.values?.length > 0) {
          const filtered = allMemories.filter(memory =>
            memory.people.some(person => params.values.includes(person))
          );
          setMemories(filtered);
        } else {
          setMemories(allMemories);
        }
      } else {
        setSearchParams(null);
        setMemories(allMemories);
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


  // Group memories by month/year and sort in reverse chronological order

  const getSortedMemoryGroups = () => {
    const groups = memories.reduce((acc, memory) => {
      const monthYear = new Date(memory.date).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!acc[monthYear]) acc[monthYear] = [];
      acc[monthYear].push(memory);
      return acc;
    }, {});


    // Convert to array and sort by date (newest first)

    return Object.entries(groups)
      .map(([monthYear, memories]) => ({
        monthYear,
        memories: memories.sort((a, b) => new Date(b.date) - new Date(a.date)),

        timestamp: new Date(memories[0].date) // Use first memory's date for sorting groups

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

      <div className="absolute top-0 w-full  text-center bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl text-yellow-300 drop-shadow-md">
        <h1 className="text-xl font-bold tracking-normal ">
          Welcome to Memory Moments ✨
        </h1>

      </div>

      {/* Memories Grid */}
      <div className="w-full mt-36 max-w-7xl px-4">
        {renderSearchHeader()}

        {/* Curved Divider */}
        {(!searchParams?.category || !searchParams?.values?.length) && (
          <svg height="80" width="100%" className="-mb-12">
            <path d="M 0 50 Q 50% 0 100% 50" stroke="white" strokeWidth="4" fill="transparent" />
          </svg>
        )}

        {/* No Memories Found */}
        {memories.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-white text-xl">No memories found. Try a different search.</p>
          </div>
        ) : (
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
                      </div>

                      {/* Highlight selected Tags/People */}
                      {searchParams?.category && searchParams?.values?.length > 0 && (
                        <div className="w-full px-1">
                          {searchParams.category === 'Tags' && (
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
                          {searchParams.category === 'People' && (
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