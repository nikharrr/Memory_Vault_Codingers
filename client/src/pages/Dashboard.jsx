import { useState,useEffect } from 'react';
import MemoryCard from '../components/MemoryCard';
import ViewMemories from './ViewMemories';
import MemoryPopup from '../components/MemoryPopup';

function Dashboard({ onNavigate }) {
  const [userName,setUserName] = useState('Guest');
  const [recentMemories,setRecentMemories] = useState([]);
  const [stats,setStats] = useState({ total: 0,favorites: 0 });
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [showViewMemories,setShowViewMemories] = useState(false);
  // Add state for popup
  const [selectedMemory,setSelectedMemory] = useState(null);
  const [isPopupOpen,setIsPopupOpen] = useState(false);

  const fetchTotalMemoryCount = async (patientId) => {
    try {
      const response = await fetch(`http://localhost:5000/${patientId}/memory-count`);
      if (!response.ok) throw new Error('Failed to fetch memory count');
      const data = await response.json();
      return data.total_memories;
    } catch (err) {
      console.error('Error fetching memory count:',err);
      return 0;
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const name = user.full_name.split(' ')[0]; // Get first name
      setUserName(name);
      fetchRecentMemories(user.patient_id);
      fetchTotalMemoryCount(user.patient_id).then(total => {
        setStats(prev => ({ ...prev,total }));
      });
    }
  },[]);

  const fetchRecentMemories = async (patientId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/memories/recent/${patientId}`);
      if (!response.ok) throw new Error('Failed to fetch recent memories');
      const data = await response.json();
      setRecentMemories(data);
      // Update only favorites count
      setStats(prev => ({
        ...prev,
        favorites: data.filter(memory => memory.favorite).length
      }));
    } catch (err) {
      console.error('Error fetching recent memories:',err);
      setError('Failed to load recent memories');
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation to add memory page
  const handleAddMemory = () => {
    window.location.href = '/#addMemory';
  };

  // Handle viewing all memories
  const handleViewFavorites = () => {
    setShowViewMemories(true);
  };

  // Handle back to dashboard from ViewMemories
  const handleBackToDashboard = () => {
    setShowViewMemories(false);
  };

  const handleOpenMemory = async (memory) => {
    try {
      const response = await fetch(`http://localhost:5000/memories/${memory.patient_id}/memory/${memory.memory_id}`);
      if (!response.ok) throw new Error('Failed to fetch memory details');

      const detailedMemory = await response.json();
      setSelectedMemory(detailedMemory);
      setIsPopupOpen(true);
    } catch (err) {
      console.error('Error fetching memory details:',err);
    }
  };

  const handleClosePopup = () => {
    setSelectedMemory(null);
    setIsPopupOpen(false);
  };

  if (showViewMemories) {
    return (
      <div>
        <button
          onClick={handleBackToDashboard}
          className="mb-4 px-4 py-2 mt-10 bg-yellow-600/30 hover:bg-yellow-600/50 border border-yellow-500 rounded-lg"
        >
          Back to Dashboard
        </button>
        <ViewMemories />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-300 mb-2 mt-5">Welcome back, {userName}</h1>
        <p className="text-lg text-gray-300">Your memory journey continues today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div
          className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center cursor-pointer hover:bg-white/20"
          onClick={() => onNavigate('home')}
        >
          <h3 className="text-2xl font-semibold mb-2">{stats.total}</h3>
          <p className="text-gray-300">Total Memories</p>
        </div>
        <div
          className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center cursor-pointer hover:bg-white/20"
          onClick={handleViewFavorites}
        >
          <h3 className="text-2xl font-semibold mb-2">{stats.favorites}</h3>
          <p className="text-gray-300">Recent Memories</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-yellow-300 mb-6">Recent Memories</h2>

      {loading ? (
        <div className="text-center text-gray-300">Loading recent memories...</div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {recentMemories.length === 0 ? (
            <p className="text-gray-300">No recent memories found!</p>
          ) : (
            recentMemories.map(memory => (
              <div
                key={memory.memory_id}
                className="flex flex-col items-center bg-[#fef1b0] p-4 rounded-xl h-full shadow-lg border border-white/40 cursor-pointer"
                onClick={() => handleOpenMemory(memory)}
              >
                <div className="relative mb-4 w-full h-60 border-2 border-white rounded-lg overflow-hidden bg-white/40">
                  <img
                    src={memory.image_url || 'https://source.unsplash.com/300x400/?memory'}
                    alt={memory.title}
                    className="w-full h-full object-cover "
                   
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-orange-500 mb-2">{memory.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">Added: {new Date(memory.created_time).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

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
              <div className="text-lg font-semibold mb-1">View Favorites</div>
              <p className="text-xs text-gray-300">See your memory collection</p>
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">Memory Calendar</h2>
          <div className="text-center p-6">
            <p className="text-3xl font-bold">{new Date().getDate()}</p>
            <p className="text-lg">{new Date().toLocaleDateString('en-US',{ month: 'long',year: 'numeric' })}</p>
            <div className="mt-4 text-sm text-gray-300">
              <p>Today's memory prompt:</p>
              <p className="italic mt-2">"What was your favorite childhood toy?"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add MemoryPopup */}
      <MemoryPopup
        memory={selectedMemory}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </div>
  );
}

export default Dashboard;