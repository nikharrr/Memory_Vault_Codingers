function MemoryCard({ title, image, rotation }) {
  return (
    <div
      className={`w-44 h-56 bg-[#fdebd0] rounded-md p-2 shadow-lg flex flex-col items-center justify-center transform ${rotation} transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,0,0.8)] hover:brightness-125`}
    >
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-cover rounded-sm mb-1"
      />
      <p className="text-xs text-gray-700 font-semibold">{title}</p>
    </div>
  );
}

export default MemoryCard;
