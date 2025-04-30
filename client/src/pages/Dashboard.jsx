import { useState, useEffect } from 'react';
import MemoryCard from '../components/MemoryCard';

// Import ViewMemories component
function ViewMemories() {
  return (
    <div className="flex flex-col items-center w-full pt-10">
      {/* Title moved to the top */}
      <h2 className="text-6xl font-extrabold text-yellow-300 mb-8 mt-10">Your Favorites</h2>

      {/* Curved string */}
      <svg height="80" width="100%" className="-mb-12">
        <path
          d="M 0 50 Q 50% 0 100% 50"
          stroke="white"
          strokeWidth="4"
          fill="transparent"
        />
      </svg>

      {/* Memory cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
        {dummyMemories.map((memory, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-[#fef1b0] p-4 rounded-xl shadow-lg border border-white/40"
          >
            {/* Polaroid-style memory image */}
            <div className="relative mb-4 w-[180px] h-[220px] border-2 border-white rounded-lg overflow-hidden bg-white/40">
              <img
                src={memory.image}
                alt={memory.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and date */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-yellow-500 mb-2">{memory.title}</h3> {/* Stronger yellow */}
              <p className="text-xs text-gray-600">{new Date(memory.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dummy data to simulate user-added memories
const dummyMemories = [
  {
    title: 'Beach',
    image: 'https://source.unsplash.com/300x400/?beach',
    date: '2025-04-01',
  },
  {
    title: 'Sunset',
    image: 'https://source.unsplash.com/300x400/?sunset',
    date: '2025-04-02',
  },
  {
    title: 'Picnic',
    image: 'https://source.unsplash.com/300x400/?picnic',
    date: '2025-04-05',
  },
  {
    title: 'Forest',
    image: 'https://source.unsplash.com/300x400/?forest',
    date: '2025-04-10',
  },
  {
    title: 'Mountains',
    image: 'https://source.unsplash.com/300x400/?mountain',
    date: '2025-04-12',
  },
];

function Dashboard() {
  const [userName, setUserName] = useState('Guest');
  const [favoriteMemories, setFavoriteMemories] = useState([]);
  const [stats, setStats] = useState({ total: 0, favorites: 0 });
  const [showViewMemories, setShowViewMemories] = useState(false);
  
  // Dummy favorite memories data
  const dummyFavorites = [
    {
      id: 1,
      title: 'Beach',
      image: 'https://source.unsplash.com/300x400/?beach',
      date: '2025-04-01',
    },
    {
      id: 2,
      title: 'Sunset',
      image: 'https://source.unsplash.com/300x400/?sunset',
      date: '2025-04-02',
    },
    {
      id: 3,
      title: 'Picnic',
      image: 'https://source.unsplash.com/300x400/?picnic',
      date: '2025-04-05',
    },
  ];
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
    }
    // Set initial favorite memories
    setFavoriteMemories(dummyFavorites);
    
    // Initialize stats
    setStats({
      total: 0,
      favorites: 0
    });
  }, []);
  
  // Handle navigation to add memory page (to be implemented)
  const handleAddMemory = () => {
    // This will be connected to navigation to the add memory page
    console.log("Navigate to add memory page");
    // No state changes here
  };

  // Handle clicking on favorites stats to show ViewMemories
  const handleViewFavorites = () => {
    setShowViewMemories(true);
  };

  // Handle back to dashboard from ViewMemories
  const handleBackToDashboard = () => {
    setShowViewMemories(false);
  };

  // If ViewMemories is active, show that component with a back button
  if (showViewMemories) {
    return (
      <div>
        <button
          onClick={handleBackToDashboard}
          className="mb-4 px-4 py-2 bg-yellow-600/30 hover:bg-yellow-600/50 border border-yellow-500 rounded-lg"
        >
          Back to Dashboard
        </button>
        <ViewMemories />
      </div>
    );
  }

  // Otherwise show the Dashboard
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-300 mb-2">Welcome back, {userName}</h1>
        <p className="text-lg text-gray-300">Your memory journey continues today</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center">
          <h3 className="text-2xl font-semibold mb-2">{stats.total}</h3>
          <p className="text-gray-300">Total Memories</p>
        </div>
        <div 
          className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center cursor-pointer hover:bg-white/20"
          onClick={handleViewFavorites}
        >
          <h3 className="text-2xl font-semibold mb-2">{stats.favorites}</h3>
          <p className="text-gray-300">Favorite Memories</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-yellow-300 mb-6">Recent Memories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {favoriteMemories.length === 0 ? (
          <p className="text-gray-300">No favorite memories yet!</p>
        ) : (
          favoriteMemories.map(memory => (
            <div
              key={memory.id}
              className="flex flex-col items-center bg-[#fef1b0] p-4 rounded-xl shadow-lg border border-white/40"
            >
              {/* Polaroid-style memory image */}
              <div className="relative mb-4 w-full h-48 border-2 border-white rounded-lg overflow-hidden bg-white/40">
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Title and date */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">{memory.title}</h3>
                <p className="text-xs text-gray-600">{new Date(memory.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              className="bg-yellow-600/30 hover:bg-yellow-600/50 border border-yellow-500 p-4 rounded-lg text-left"
              onClick={handleAddMemory}
            >
              <div className="text-lg font-semibold mb-1">Add Memory</div>
              <p className="text-xs text-gray-300">Record a new memory</p>
            </button>
            <button 
              className="bg-yellow-600/30 hover:bg-yellow-600/50 border border-yellow-500 p-4 rounded-lg text-left"
              onClick={handleViewFavorites}
            >
              <div className="text-lg font-semibold mb-1">View All</div>
              <p className="text-xs text-gray-300">See your memory collection</p>
            </button>
            <button className="bg-yellow-600/30 hover:bg-yellow-600/50 border border-yellow-500 p-4 rounded-lg text-left">
              <div className="text-lg font-semibold mb-1">Memory Test</div>
              <p className="text-xs text-gray-300">Test your recall</p>
            </button>
            <button className="bg-white/10 hover:bg-white-600/50 border border-white-500 p-4 rounded-lg text-left">
              <div className="text-lg font-semibold mb-1">Daily Reminder</div>
              <p className="text-xs text-gray-300">Set memory prompts</p>
            </button>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">Memory Calendar</h2>
          <div className="text-center p-6">
            <p className="text-3xl font-bold">{new Date().getDate()}</p>
            <p className="text-lg">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            <div className="mt-4 text-sm text-gray-300">
              <p>Today's memory prompt:</p>
              <p className="italic mt-2">"What was your favorite childhood toy?"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;