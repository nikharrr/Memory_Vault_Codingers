function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl max-w-2xl text-center shadow-lg">
        <h1 className="text-5xl font-bold mb-4 text-yellow-300 drop-shadow-md">
          Welcome to Memory Moments ✨
        </h1>
        <p className="text-lg text-gray-200">
          Let the jugnus of your past guide you through glowing memories.
        </p>
      </div>
    </div>
  );
}

export default Home;
