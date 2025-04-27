import { useState, useEffect } from 'react';

function Sidebar({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleClick = (page) => {
    onNavigate(page);
    setOpen(false);
  };

  if (!isLoggedIn) {
    // If user is not logged in, don't render anything
    return null;
  }

  return (
    <>
      {/* Button to toggle sidebar - increased z-index to be above navbar */}
      <button
        className="text-white text-3xl bg-white/10 rounded-lg p-2 hover:bg-white/20 fixed top-4 left-4 z-30" 
        onClick={() => setOpen(!open)}
      >
        {open ? '×' : '☰'}
      </button>

      {/* Sidebar */}
      {open && (
        <div className="fixed top-0 left-0 h-full w-64 bg-[#0d1321] shadow-lg p-6 pt-20 z-20 flex flex-col gap-4">
          <button onClick={() => handleClick('dashboard')} className="text-white hover:text-yellow-300 text-left font-semibold">Dashboard</button>
          <button onClick={() => handleClick('addMemory')} className="text-white hover:text-yellow-300 text-left font-semibold">Add Memory</button>
          <button onClick={() => handleClick('viewMemories')} className="text-white hover:text-yellow-300 text-left font-semibold">View Memories</button>
          <button onClick={() => handleClick('memoryDetail')} className="text-white hover:text-yellow-300 text-left font-semibold">Family</button>
          <button onClick={() => handleClick('forgottenMemories')} className="text-white hover:text-yellow-300 text-left font-semibold">Forgotten Memories</button>
          <button onClick={() => handleClick('settings')} className="text-white hover:text-yellow-300 text-left font-semibold">Settings</button>
        </div>
      )}
    </>
  );
}

export default Sidebar;