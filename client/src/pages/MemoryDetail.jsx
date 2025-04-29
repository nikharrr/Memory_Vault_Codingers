
import React, { useState, useEffect } from "react";
import axios from "axios";

function MemoryDetail() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({ name: "", relationship: "", photo: null });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const patientId = user ? user.patient_id : null;

  // Fetch all profiles on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/${patientId}/people`);
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        alert("Failed to load profiles");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfiles();
  }, [patientId]);

  const handleSelectProfile = (index) => {
    setSelectedProfiles((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRemoveProfiles = async () => {
    try {
      setIsLoading(true);
      // Delete each selected profile
      await Promise.all(
        selectedProfiles.map(async (index) => {
          const profileId = profiles[index].person_id;
          console.log(profileId);
          await axios.delete(`http://localhost:5000/${patientId}/people/delete/${profileId}`);
        })
      );
      // Refresh the list after deletion
      const response = await axios.get(`http://localhost:5000/${patientId}/people`);
      setProfiles(response.data);
      setSelectedProfiles([]);
      alert("Profiles deleted successfully!");
    } catch (error) {
      console.error("Error deleting profiles:", error);
      alert("Failed to delete profiles");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteProfiles = async () => {
    try {
      setIsLoading(true);
      // Toggle favorite status for each selected profile
      await Promise.all(
        selectedProfiles.map(async (index) => {
          const profileId = profiles[index].person_id;
          const currentStatus = profiles[index].favorite;
          await axios.patch(`http://localhost:5000/${patientId}/people/edit/${profileId}`, {
            favorite: !currentStatus
          });
        })
      );
      // Refresh the list after update
      const response = await axios.get(`http://localhost:5000/${patientId}/people`);
      console.log(response.data.image_url);
      setProfiles(response.data);
      setSelectedProfiles([]);
    } catch (error) {
      console.error("Error updating favorites:", error);
      alert("Failed to update favorites");
    } finally {
      setIsLoading(false);
    }
  };

 const handleAddProfile = async (e) => {
  e.preventDefault();

  if (!newProfile.name || !newProfile.relationship || !newProfile.photo) {
    alert("Please fill all fields");
    return;
  }

  if (newProfile.photo.size > 5 * 1024 * 1024) { // Check 5 MB
    alert("Image must be smaller than 5MB");
    return;
  }

  try {
    setIsLoading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result; // remove data:image/jpeg;base64, etc
    }
      const response = await axios.post(
        `http://localhost:5000/${patientId}/people/create`,
        {
          name: newProfile.name,
          relationship: newProfile.relationship,
          image_url: base64Image
        }
      );

      // Assume backend returns: { name, relationship, _id, image_url: <public_url> }
      
      const newProfileData = {
        ...response.data,
        photo: response.data.image_url, // VERY important for <img src="">
        favorite: false
      };

      setProfiles((prev) => [...prev, newProfileData]);
      setNewProfile({ name: "", relationship: "", photo: null });
      setShowModal(false);
      alert("Profile added successfully!");
    

   
  } catch (error) {
    console.error("Error adding profile:", error);
    alert("Failed to add profile");
  } finally {
    setIsLoading(false);
  }
};

  
  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col p-4 relative">
      {/* Modal Backdrop - Now with transparent background */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="bg-[#121233] p-6 rounded-lg w-full max-w-md border border-white/20 shadow-xl"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add New Profile</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-white hover:text-yellow-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddProfile} className="space-y-4">
              <div>
                <label className="block mb-1">Name:</label>
                <input
                  type="text"
                  value={newProfile.name}
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                  className="w-full p-2 rounded bg-[#1F1F4D] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Relationship:</label>
                <input
                  type="text"
                  value={newProfile.relationship}
                  onChange={(e) => setNewProfile({ ...newProfile, relationship: e.target.value })}
                  className="w-full p-2 rounded bg-[#1F1F4D] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Upload Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewProfile({ ...newProfile, photo: e.target.files[0] })}
                  className="w-full"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-[#2B2B4D] hover:bg-[#3B3B6D] flex-1 py-2 rounded-lg font-semibold"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-[#3B3B6D] hover:bg-[#4B4B7D] flex-1 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="text-3xl font-extrabold mb-4 text-center text-amber-300">People Selected: {selectedProfiles.length}</div>

      {/* Profiles List */}
      <div 
        className="w-full max-w-6xl mx-auto max-h-90 overflow-y-auto mb-6 bg-transparent p-4 rounded-lg"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 transparent',
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className={`flex flex-col items-center cursor-pointer p-2 rounded-lg mr-15 ${
                selectedProfiles.includes(index) ? "bg-[#1F1F4D]" : ""
              }`}
              onClick={() => handleSelectProfile(index)}
              tabIndex={0}
            >
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-28 h-28 rounded-full object-cover mb-2 border-2 border-white"
              />
              <div className="text-center">
                <div className="font-semibold flex items-center justify-center gap-1">
                  {profile.name}
                  {profile.favorite && <span>❤</span>}
                </div>
                <div className="text-sm text-gray-400">{profile.relationship}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6 justify-center flex-wrap">
        <button
          onClick={handleRemoveProfiles}
          className="bg-[#2B2B4D] hover:bg-[#3B3B6D] px-6 py-2 rounded-lg font-semibold"
        >
          Remove
        </button>
        <button
          onClick={handleFavoriteProfiles}
          className="bg-[#2B2B4D] hover:bg-[#3B3B6D] px-6 py-2 rounded-lg font-semibold"
        >
          Toggle Favorite
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#2B2B4D] hover:bg-[#3B3B6D] px-6 py-2 rounded-lg font-semibold"
        >
          + Add Profile
        </button>
      </div>
    </div>
  );
}

export default MemoryDetail;