import MemoryCard from '../components/MemoryCard';

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

export default ViewMemories;
