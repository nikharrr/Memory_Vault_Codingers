import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

// MemoryPopup component that can be used across different pages
const MemoryPopup = ({ memory, isOpen, onClose }) => {
  // If component receives null memory or isn't open, don't render
  if (!memory || !isOpen) return null;

  // Handle click outside to close
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      onClose();
    }
  };

  const handleEdit = () => {
    localStorage.setItem('editingMemory', JSON.stringify(memory));
    onClose();
    window.location.href = '/#editMemory';
  };

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 popup-overlay"
      onClick={handleOutsideClick}
    >
      <div className="bg-[#FFE5B4] rounded-xl shadow-2xl max-w-4xl w-full mt-15 max-h-[75vh] overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Close button with enhanced visibility */}
<button 
  onClick={onClose}
  className="absolute top-2 right-6  bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
>
<XMarkIcon className="w-4 h-4 text-white hover:text-yellow-300" />
</button>

        {/* Image container */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[75vh] relative bg-white/40">
          <img
            src={memory.image || memory.image_url || memory.src}
            alt={memory.title}
            className="w-full h-full object-cover "
            style={{ objectPosition: '0px -5px' }}
          />
        </div>

        {/* Memory details */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">{memory.title}</h2>

          {/* Memory date */}
          <div className="mb-4">
            <p className="text-sm text-gray-900">
              {memory.memory_date ? new Date(memory.memory_date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'Date not available'}
            </p>
          </div>

          {/* Description */}
          {memory.descrip && (
            <div className="mb-4">
              <h2 className="text-orange-600 text-1g">Memory: {memory.descrip}</h2>
            </div>
          )}

          {/* People */}
          {memory.people?.length > 0 && (
            <div className="mb-6">
              <h3 className=" font-medium text-orange-500 mb-2">People</h3>
              <div className="flex flex-wrap gap-2">
                {memory.people.map((person, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-300 border border-yellow-300 text-red-500  px-3 py-1 rounded-full"
                  >
                    {person}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {memory.tags?.length > 0 && (
            <div className="mb-6">
              <h3 className=" font-medium text-orange-500 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {memory.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-300 border border-yellow-300 text-red-500 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-auto pt-4 flex justify-end">
            <button
              onClick={handleEdit}
              className="text-yellow-600 hover:text-yellow-700 text-xs px-2 py-1 rounded-lg transition-colors"
            >
              Edit Memory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryPopup;
