import { useState } from 'react';
import axios from 'axios'; // ✅ Import Axios

function AddMemory(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [peopleInvolved, setPeopleInvolved] = useState([]);
  const [images, setImages] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');


  const user = JSON.parse(localStorage.getItem('user'));
  const patient_id= user ? user.patient_id : null;
  console.log(patient_id)

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value.split(',').map((tag) => tag.trim())); // Comma separated tags
  };

  const handlePeopleInvolvedChange = (e) => {
    setPeopleInvolved(e.target.value.split(',').map((person) => person.trim())); // Comma separated people
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || tags.length === 0 || peopleInvolved.length === 0 || images.length === 0) {
      setPopupMessage('Please fill out all fields, add at least one image, and provide tags and people involved.');
      setPopupType('error');
      setTimeout(() => {
        setPopupMessage('');
        setPopupType('');
      }, 3000);
      return;
    }

    const newMemory = {
      title,
      descrip: description,
      memory_date: new Date().toISOString(), // Set current date as memory date
      tags,
      people_involved: peopleInvolved,
    };

    try {
      // 🔥 Send memory to backend API

      await axios.post(`http://localhost:5000/patients/${patient_id}/memories`, newMemory);

      // ✅ If successful
  
      setTitle('');
      setDescription('');
      setTags([]);
      setPeopleInvolved([]);
      setImages([]);
      setPopupMessage('Memory saved successfully!');
      setPopupType('success');
    } catch (error) {
      console.error('Error saving memory to backend:', error);

      // ⚠ Fallback: Optional - Save to localStorage if server fails

      let memories = JSON.parse(localStorage.getItem('memories')) || [];
      memories.push(newMemory);
      localStorage.setItem('memories', JSON.stringify(memories));

      setPopupMessage('Memory saved locally (server unavailable).');
      setPopupType('error');
    } finally {
      setTimeout(() => {
        setPopupMessage('');
        setPopupType('');
      }, 3000);
    }
  };

  return (
    <div className="bg-dark-blue max-w-5xl mx-auto p-8 relative">
      {/* Popup */}
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
          <h2 className="text-xl font-semibold text-yellow-300 mb-4 text-center">Upload Memory Images</h2>

          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
            multiple
          />
          <label htmlFor="image-upload" className="block text-center cursor-pointer">
            <div
              className="border-4 border-yellow-500 border-dotted p-12 rounded-lg"
              style={{ height: '200px' }}
            >
              <p className="text-gray-300">Click here to select images (drag & drop or browse)</p>
            </div>
          </label>

          {/* Image preview */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover rounded-lg"
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

        {/* Right side: Form */}
        <div className="bg-white/20 backdrop-blur-md border border-white/40 p-6 rounded-xl w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">Memory Details</h2>



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
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-yellow-500 hover:bg-yellow-600 py-3 rounded-lg text-white font-semibold"
          >
            Save Memory
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMemory;
