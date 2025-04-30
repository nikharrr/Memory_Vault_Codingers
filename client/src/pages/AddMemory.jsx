import { useState } from 'react';
import axios from 'axios';

function AddMemory() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [peopleInvolved, setPeopleInvolved] = useState([]);
  const [image, setImage] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const patient_id = user ? user.patient_id : null;
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(selectedFile.type)) {
        setPopupMessage('Only JPG, PNG, and GIF images are allowed');
        setPopupType('error');
        setTimeout(() => {
          setPopupMessage('');
          setPopupType('');
        }, 3000);
        return;
      }

      // Validate file size (e.g., 5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setPopupMessage('Image must be smaller than 5MB');
        setPopupType('error');
        setTimeout(() => {
          setPopupMessage('');
          setPopupType('');
        }, 3000);
        return;
      }

      setImage(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value.split(',').map((tag) => tag.trim()));
  };

  const handlePeopleInvolvedChange = (e) => {
    setPeopleInvolved(e.target.value.split(',').map((person) => person.trim()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title || !description || tags.length === 0 || peopleInvolved.length === 0 || !image) {
      setPopupMessage('Please fill out all fields and add an image.');
      setPopupType('error');
      setTimeout(() => {
        setPopupMessage('');
        setPopupType('');
      }, 3000);
      setIsLoading(false);
      return;
    }

    // Convert image to base64 for simplicity
    const reader = new FileReader();
    reader.onloadend = async () => {
      const newMemory = {
        title,
        descrip: description,
        memory_date: new Date().toISOString(),
        tags,
        people_involved: peopleInvolved,
        image: reader.result, // base64 image data
      };

      try {
        // Send memory to backend
        const response = await axios.post(
          `http://localhost:5000/memories/${patient_id}/create`,
          newMemory
        );
        console.log(response.data);

        // Reset form
        setTitle('');
        setDescription('');
        setTags([]);
        setPeopleInvolved([]);
        setImage(null);
        
        setPopupMessage('Memory saved successfully!');
        window.dispatchEvent(new Event('memoryAdded'));
        setPopupType('success');
      } catch (error) {
        console.error('Error saving memory:', error);
        
        // Fallback to localStorage
        let memories = JSON.parse(localStorage.getItem('memories')) || [];
        memories.push(newMemory);
        localStorage.setItem('memories', JSON.stringify(memories));

        setPopupMessage('Memory saved locally (server unavailable). Image not saved locally.');
        setPopupType('error');
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setPopupMessage('');
          setPopupType('');
        }, 3000);
      }
    };

    if (image) {
      reader.readAsDataURL(image); // Convert the image to base64
    }
  };

  return (
    <div className="bg-dark-blue max-w-5xl mx-auto p-8 relative">
      {/* Popup Notification */}
      {popupMessage && (
        <div
          className={`fixed bottom-8 right-8 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50
          ${popupType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {popupMessage}
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-300 mb-2">Add a New Memory</h1>
        <p className="text-lg text-gray-300">Capture your most precious moments</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6">
        {/* Left side: Image uploader */}
        <div className="bg-white/20 backdrop-blur-md border border-white/40 p-6 rounded-xl w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-yellow-300 mb-4 text-center">Upload Memory Image</h2>

          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
            accept="image/jpeg, image/png, image/gif"
          />
          <label htmlFor="image-upload" className="block text-center cursor-pointer">
            <div
              className="border-4 border-yellow-500 border-dotted p-12 rounded-lg"
              style={{ height: '200px' }}
            >
              {image ? (
                <div className="relative h-full w-full">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 p-2 rounded-full"
                  >
                    X
                  </button>
                </div>
              ) : (
                <p className="text-gray-300">Click here to select an image</p>
              )}
            </div>
          </label>
        </div>

        {/* Right side: Form */}
        <div className="bg-white/20 backdrop-blur-md border border-white/40 p-6 rounded-xl w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">Memory Details</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="title" className="block text-lg font-semibold text-gray-300 mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-yellow-500 rounded-lg bg-transparent text-gray-300 mb-4 focus:ring-2 focus:ring-yellow-300"
              required
            />

            <label htmlFor="description" className="block text-lg font-semibold text-gray-300 mb-2">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-yellow-500 rounded-lg bg-transparent text-gray-300 mb-4 focus:ring-2 focus:ring-yellow-300"
              rows="4"
              required
            ></textarea>

            <label htmlFor="tags" className="block text-lg font-semibold text-gray-300 mb-2">
              Tags (comma separated):
            </label>
            <input
              type="text"
              id="tags"
              value={tags.join(', ')}
              onChange={handleTagsChange}
              className="w-full p-3 border border-yellow-500 rounded-lg bg-transparent text-gray-300 mb-4 focus:ring-2 focus:ring-yellow-300"
              required
            />

            <label htmlFor="people" className="block text-lg font-semibold text-gray-300 mb-2">
              People Involved (comma separated):
            </label>
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
              className="w-full bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg text-white font-semibold disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Memory'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMemory;
