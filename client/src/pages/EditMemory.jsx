import { useState, useEffect } from 'react';

function EditMemory() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [peopleInvolved, setPeopleInvolved] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');
  const [loading, setLoading] = useState(true);
  const [memoryDate, setMemoryDate] = useState('');

  // Get patient_id from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const patient_id = user ? user.patient_id : null;

  useEffect(() => {
    const storedMemory = localStorage.getItem('editingMemory');
    if (storedMemory) {
      const memory = JSON.parse(storedMemory);
      setTitle(memory.title || '');
      setDescription(memory.descrip || '');
      setMemoryDate(memory.memory_date?.split('T')[0] || '');
      setTags(memory.tags || []);
      setPeopleInvolved(memory.people || []);
      setExistingImageUrls([memory.image_url || '']);
      setLoading(false);
    } else {
      window.location.href = '/#home'; // Redirect if no memory to edit
    }
  }, []);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImageUrls(existingImageUrls.filter((_, i) => i !== index));
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value.split(',').map(tag => tag.trim()));
  };

  const handlePeopleInvolvedChange = (e) => {
    setPeopleInvolved(e.target.value.split(',').map(person => person.trim()));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const storedMemory = JSON.parse(localStorage.getItem('editingMemory'));
    if (!storedMemory) {
      setPopupMessage('Memory data not found');
      setPopupType('error');
      return;
    }

    if (!title || !description || !memoryDate) {
      setPopupMessage('Please fill out all required fields.');
      setPopupType('error');
      setTimeout(() => {
        setPopupMessage('');
        setPopupType('');
      }, 3000);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/memories/${patient_id}/edit/${storedMemory.memory_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          descrip: description,
          memory_date: memoryDate,
          tags,
          people_involved: peopleInvolved
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update memory');
      }

      setPopupMessage('Memory updated successfully!');
      setPopupType('success');
      
      // Clear the stored memory and redirect after success
      localStorage.removeItem('editingMemory');
      setTimeout(() => {
        window.location.href = '/#home';
      }, 1500);
      
    } catch (error) {
      console.error('Error updating memory:', error);
      setPopupMessage('Failed to update memory.');
      setPopupType('error');
    }
  };

  if (loading) {
    return (
      <div className="bg-dark-blue max-w-5xl mx-auto p-8 text-center">
        <div className="text-yellow-300 text-xl">Loading memory...</div>
      </div>
    );
  }

  return (
    <div className="bg-dark-blue max-w-5xl mx-auto p-8 relative">
      {popupMessage && (
        <div
          className={`fixed bottom-8 right-8 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50
            ${popupType === 'success' ? 'bg-green-500' :
              popupType === 'warning' ? 'bg-yellow-500' :
                'bg-red-500'} text-white`}
        >
          {popupMessage}
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-300 mb-2">Edit Memory</h1>
        <p className="text-lg text-gray-300">Update your precious memory</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Left side */}
        <div className="bg-white/20 backdrop-blur-md border border-white/40 p-6 rounded-xl w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-yellow-300 mb-4 text-center">Memory Images</h2>

          {existingImageUrls.length > 0 && (
            <div className="mb-6">
              <h3 className="text-gray-300 mb-2">Current Images:</h3>
              <div className="grid grid-cols-2 gap-4">
                {existingImageUrls.map((imageUrl, index) => (
                  <div key={`existing-${index}`} className="relative">
                    <img
                      src={imageUrl}
                      alt={`Memory ${index}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleRemoveExistingImage(index)}
                      className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 p-2 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
            multiple
          />
          <label htmlFor="image-upload" className="block text-center cursor-pointer">
            <div
              className="border-4 border-yellow-500 border-dotted p-6 rounded-lg"
              style={{ minHeight: '120px' }}
            >
              <p className="text-gray-300">Click to add more images</p>
            </div>
          </label>

          {images.length > 0 && (
            <div className="mt-4">
              <h3 className="text-gray-300 mb-2">New Images to Add:</h3>
              <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <div key={`new-${index}`} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 p-2 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="bg-white/20 backdrop-blur-md border border-white/40 p-6 rounded-xl w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">Memory Details</h2>

          <label htmlFor="title" className="block text-lg font-semibold text-gray-300 mb-2">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-yellow-500 rounded-lg bg-transparent text-gray-300 mb-4 focus:ring-2 focus:ring-yellow-300"
            required
          />

          <label htmlFor="description" className="block text-lg font-semibold text-gray-300 mb-2">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-yellow-500 rounded-lg bg-transparent text-gray-300 mb-4 focus:ring-2 focus:ring-yellow-300"
            rows="4"
            required
          ></textarea>

          <label htmlFor="memoryDate" className="block text-lg font-semibold text-gray-300 mb-2">Memory Date:</label>
          <input
            type="date"
            id="memoryDate"
            value={memoryDate}
            onChange={(e) => setMemoryDate(e.target.value)}
            className="w-full p-3 border border-yellow-500 rounded-lg bg-transparent text-gray-300 mb-4 focus:ring-2 focus:ring-yellow-300"
            required
          />

          <label htmlFor="tags" className="block text-lg font-semibold text-gray-300 mb-2">Tags (comma separated):</label>
          <input
            type="text"
            id="tags"
            value={tags.join(', ')}
            onChange={handleTagsChange}
            className="w-full p-3 border border-yellow-500 rounded-lg bg-transparent text-gray-300 mb-4 focus:ring-2 focus:ring-yellow-300"
            required
          />

          <label htmlFor="people" className="block text-lg font-semibold text-gray-300 mb-2">People Involved (comma separated):</label>
          <input
            type="text"
            id="people"
            value={peopleInvolved.join(', ')}
            onChange={handlePeopleInvolvedChange}
            className="w-full p-3 border border-yellow-500 rounded-lg bg-transparent text-gray-300 mb-4 focus:ring-2 focus:ring-yellow-300"
            required
          />

          <button
            type="submit"
            onClick={handleUpdate}
            className="w-full bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg text-white font-semibold"
          >
            Update Memory
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditMemory;
