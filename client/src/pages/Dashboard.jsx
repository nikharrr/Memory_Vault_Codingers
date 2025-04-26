import { useState, useEffect } from 'react';

function Dashboard() {
  const [userName, setUserName] = useState('Guest');
  const [recentMemories, setRecentMemories] = useState([]);
  const [stats, setStats] = useState({ total: 0, recent: 0, favorites: 0 });

  useEffect(() => {
    // Simulate fetching user data from localStorage or session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
    }

    // Dummy data for recent memories
    setRecentMemories([
      { id: 1, title: 'Beach Day', date: '2025-04-20', image: 'https://source.unsplash.com/300x200/?beach' },
      { id: 2, title: 'Family Picnic', date: '2025-04-15', image: 'https://source.unsplash.com/300x200/?picnic' },
      { id: 3, title: 'Garden Visit', date: '2025-04-10', image: 'https://source.unsplash.com/300x200/?garden' }
    ]);

    // Dummy stats
    setStats({ total: 24, recent: 3, favorites: 7 });
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-300 mb-2">Welcome back, {userName}</h1>
        <p className="text-lg text-gray-300">Your memory journey continues today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center">
          <h3 className="text-2xl font-semibold mb-2">{stats.total}</h3>
          <p className="text-gray-300">Total Memories</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center">
          <h3 className="text-2xl font-semibold mb-2">{stats.recent}</h3>
          <p className="text-gray-300">Recent Additions</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center">
          <h3 className="text-2xl font-semibold mb-2">{stats.favorites}</h3>
          <p className="text-gray-300">Favorite Memories</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-yellow-300 mb-4">Recent Memories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {recentMemories.map(memory => (
          <div key={memory.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
            <img src={memory.image} alt={memory.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold mb-1">{memory.title}</h3>
              <p className="text-sm text-gray-300">{memory.date}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-yellow-600/30 hover:bg-yellow-600/50 border border-yellow-500 p-4 rounded-lg text-left">
              <div className="text-lg font-semibold mb-1">Add Memory</div>
              <p className="text-xs text-gray-300">Record a new memory</p>
            </button>
            <button className="bg-yellow-600/30 hover:bg-yellow-600/50 border border-yellow-500 p-4 rounded-lg text-left">
              <div className="text-lg font-semibold mb-1">View All</div>
              <p className="text-xs text-gray-300">See your memory collection</p>
            </button>
            <button className="bg-yellow-600/30 hover:bg-yellow-600/50 border border-yellow-500 p-4 rounded-lg text-left">
              <div className="text-lg font-semibold mb-1">Memory Test</div>
              <p className="text-xs text-gray-300">Test your recall</p>
            </button>
            <button className="bg-yellow-600/30 hover:bg-yellow-600/50 border border-yellow-500 p-4 rounded-lg text-left">
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