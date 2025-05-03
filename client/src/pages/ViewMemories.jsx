import { useState,useEffect } from 'react';
import MemoryCard from '../components/MemoryCard';
import MemoryPopup from '../components/MemoryPopup';

function ViewMemories() {
  const [favorites,setFavorites] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [selectedMemory,setSelectedMemory] = useState(null);
  const [isPopupOpen,setIsPopupOpen] = useState(false);

  const getPatientId = () => {
    const user = localStorage.getItem('user');
    const userData = user ? JSON.parse(user) : null;
    return userData ? userData.patient_id : null;
  };

  const toggleFavorite = async (memoryId) => {
    const patientId = getPatientId();
    if (!patientId) return;

    try {
      const response = await fetch(`http://localhost:5000/memories/${patientId}/toggle-favorite/${memoryId}`,{
        method: 'PATCH',
      });

      if (!response.ok) throw new Error('Failed to toggle favorite');
      fetchFavorites(); // Refresh the favorites list
    } catch (err) {
      console.error('Error toggling favorite:',err);
    }
  };

  const handleOpenMemory = async (memory) => {
    const patientId = getPatientId();
    if (!patientId) return;

    try {
      const response = await fetch(`http://localhost:5000/memories/${patientId}/memory/${memory.memory_id}`);
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

  const fetchFavorites = async () => {
    const patientId = getPatientId();
    if (!patientId) {
      setError('User not found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/memories/${patientId}/favorites`);
      if (!response.ok) throw new Error('Failed to fetch favorites');
      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();

    // Listen for favorite updates
    window.addEventListener('favoritesUpdated',fetchFavorites);

    return () => {
      window.removeEventListener('favoritesUpdated',fetchFavorites);
    };
  },[]);

  if (loading) return <div className="text-center mt-10 text-yellow-300">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center w-full pt-5">
      <h2 className="text-5xl font-extrabold text-yellow-300 mb-4 mt-0">Your Favorites</h2>

      <svg height="80" width="100%" className="-mb-12">
        <path
          d="M 0 50 Q 50% 0 100% 50"
          stroke="white"
          strokeWidth="4"
          fill="transparent"
        />
      </svg>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
        {favorites.map((memory) => (
          <div
            key={memory.memory_id}
            className="relative flex flex-col items-center bg-[#fef1b0] p-2 rounded-xl shadow-lg border border-white/40 cursor-pointer"
            onClick={() => handleOpenMemory(memory)}
          >
            <div className="relative mb-4 w-[180px] h-[220px] border-2 border-white rounded-lg overflow-hidden bg-white/40">
              <img
                src={memory.image_url}
                alt={memory.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-orange-500 mb-2">{memory.title}</h3>
              <p className="text-xs text-gray-600">
                {new Date(memory.memory_date).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent opening popup when clicking heart
                toggleFavorite(memory.memory_id);
              }}
              className="absolute bottom-3 right-3 z-10 flex items-center justify-center w-7 h-7 transition-transform hover:scale-110"
            >
              <i className="bi bi-suit-heart-fill text-red-500 text-xl"></i>
            </button>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center mt-10 text-gray-400">
          No favorite memories yet. Add some by clicking the heart icon on your memories!
        </div>
      )}

      {/* Add MemoryPopup */}
      <MemoryPopup
        memory={selectedMemory}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </div>
  );
}

export default ViewMemories;
