import MemoryCard from '../components/MemoryCard';

const dummyMemories = [
  { title: 'Beach', image: 'https://source.unsplash.com/300x400/?beach', rotate: '-rotate-[12deg]' },
  { title: 'Sunset', image: 'https://source.unsplash.com/300x400/?sunset', rotate: '-rotate-[6deg]' },
  { title: 'Picnic', image: 'https://source.unsplash.com/300x400/?picnic', rotate: 'rotate-[0deg]' },
  { title: 'Forest', image: 'https://source.unsplash.com/300x400/?forest', rotate: 'rotate-[6deg]' },
  { title: 'Mountains', image: 'https://source.unsplash.com/300x400/?mountain', rotate: 'rotate-[12deg]' },
];

function ViewMemories() {
  return (
    <div className="flex flex-col items-center w-full pt-10">
      
      <h2 className="text-6xl font-extrabold text-yellow-300 mb-8">
        View Memories
      </h2>

      {/* Curved string */}
      <svg height="80" width="100%" className="-mb-12">
        <path
          d="M 0 50 Q 50% 0 100% 50"
          stroke="white"
          strokeWidth="4"
          fill="transparent"
        />
      </svg>

      {/* Memory cards */}
      <div className="flex justify-center gap-10 flex-wrap mt-6">
        {dummyMemories.map((memory, idx) => (
          <MemoryCard
            key={idx}
            title={memory.title}
            image={memory.image}
            rotation={memory.rotate}
          />
        ))}
      </div>

    </div>
  );
}

export default ViewMemories;
