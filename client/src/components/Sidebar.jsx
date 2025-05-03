import { useState,useEffect } from 'react';

function Sidebar({ onNavigate }) {
  const [open,setOpen] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  },[]);

  const handleClick = (page) => {
    onNavigate(page);
    setOpen(false);
  };

  if (!isLoggedIn) {
    // If the user is not logged in, return null (no sidebar or button visible)
    return null;
  }

  return (
    <>
      {/* Button to toggle sidebar - increased z-index to be above navbar */}
      <button
        className="text-white text-3xl bg-white/10 rounded-lg p-2 hover:bg-white/20 fixed top-4 left-4 z-60"
        onClick={() => setOpen(!open)}
      >
        {open ? '×' : '☰'}
      </button>

      {/* Sidebar */}
      {open && (
        <div className="fixed top-0 left-0 h-full w-64 bg-[#0d1321] shadow-lg p-6 pt-20 z-50 flex flex-col">
          <div className="flex flex-col gap-4 flex-grow">
            <button onClick={() => handleClick('dashboard')} className="text-white hover:text-yellow-300 text-left font-semibold">🏠 Dashboard</button>
            <button onClick={() => handleClick('addMemory')} className="text-white hover:text-yellow-300 text-left font-semibold">📝 Add Memory</button>
            <button onClick={() => handleClick('viewMemories')} className="text-white hover:text-yellow-300 text-left font-semibold">⭐ Favorite Memories</button>
            <button onClick={() => handleClick('memoryDetail')} className="text-white hover:text-yellow-300 text-left font-semibold">👨‍👩‍👧‍👦 Family</button>
          </div>
          <button onClick={() => handleClick('settings')} className="text-white hover:text-yellow-300 text-left font-semibold mt-auto mb-4">⚙️ Settings</button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
