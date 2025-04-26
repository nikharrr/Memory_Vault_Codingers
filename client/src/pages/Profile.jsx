import { useState, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    joinDate: '',
    memoryCount: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    weeklyDigest: true,
    memoryAnniversaries: true
  });

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({
        name: userData.name || 'User',
        email: userData.email || 'user@example.com',
        joinDate: userData.joinDate || new Date().toLocaleDateString(),
        memoryCount: userData.memoryCount || 24
      });
      
      setFormData({
        name: userData.name || '',
        email: userData.email || ''
      });

      // Get notification preferences
      if (userData.notifications) {
        setNotifications(userData.notifications);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationToggle = (key) => {
    const updatedNotifications = {
      ...notifications,
      [key]: !notifications[key]
    };
    
    setNotifications(updatedNotifications);
    
    // Update in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const updatedUser = {
        ...userData,
        notifications: updatedNotifications
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const updatedUser = {
        ...userData,
        name: formData.name,
        email: formData.email
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update state
      setUser({
        ...user,
        name: formData.name,
        email: formData.email
      });
      
      setIsEditing(false);
      
      // Force page reload to update navbar
      window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-300 mb-8 text-center">Your Profile</h2>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-semibold">{user.name}</h3>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-yellow-600/30 hover:bg-yellow-600/50 border border-yellow-500 px-4 py-2 rounded text-sm"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-gray-400 text-sm">Member Since</h4>
                <p>{user.joinDate}</p>
              </div>
              <div>
                <h4 className="text-gray-400 text-sm">Total Memories</h4>
                <p>{user.memoryCount}</p>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2">Activity Summary</h4>
              <div className="h-4 bg-white/10 rounded-full mb-2">
                <div 
                  className="h-4 bg-yellow-500 rounded-full" 
                  style={{ width: '65%' }}
                ></div>
              </div>
              <p className="text-sm text-gray-300">You've visited your memories 12 times this month</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Change Password</h4>
          <button className="bg-yellow-600/30 hover:bg-yellow-600/50 border border-yellow-500 px-4 py-2 rounded text-sm">
            Reset Password
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Notification Preferences</h4>
          
          <div className="flex items-center justify-between mb-4">
            <span>Daily Memory Reminders</span>
            <div className="relative inline-block w-12 h-6">
              <input 
                type="checkbox" 
                className="opacity-0 w-0 h-0" 
                checked={notifications.dailyReminders}
                onChange={() => handleNotificationToggle('dailyReminders')}
              />
              <span 
                className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${notifications.dailyReminders ? 'bg-yellow-500' : 'bg-gray-400'}`}
                onClick={() => handleNotificationToggle('dailyReminders')}
              >
                <span 
                  className={`absolute h-4 w-4 top-1 bg-white rounded-full transition-all duration-300 ${notifications.dailyReminders ? 'left-7' : 'left-1'}`}
                ></span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span>Weekly Memory Digest</span>
            <div className="relative inline-block w-12 h-6">
              <input 
                type="checkbox" 
                className="opacity-0 w-0 h-0" 
                checked={notifications.weeklyDigest}
                onChange={() => handleNotificationToggle('weeklyDigest')}
              />
              <span 
                className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${notifications.weeklyDigest ? 'bg-yellow-500' : 'bg-gray-400'}`}
                onClick={() => handleNotificationToggle('weeklyDigest')}
              >
                <span 
                  className={`absolute h-4 w-4 top-1 bg-white rounded-full transition-all duration-300 ${notifications.weeklyDigest ? 'left-7' : 'left-1'}`}
                ></span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Memory Anniversaries</span>
            <div className="relative inline-block w-12 h-6">
              <input 
                type="checkbox" 
                className="opacity-0 w-0 h-0" 
                checked={notifications.memoryAnniversaries}
                onChange={() => handleNotificationToggle('memoryAnniversaries')}
              />
              <span 
                className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${notifications.memoryAnniversaries ? 'bg-yellow-500' : 'bg-gray-400'}`}
                onClick={() => handleNotificationToggle('memoryAnniversaries')}
              >
                <span 
                  className={`absolute h-4 w-4 top-1 bg-white rounded-full transition-all duration-300 ${notifications.memoryAnniversaries ? 'left-7' : 'left-1'}`}
                ></span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-4">
          <button className="bg-red-500/30 hover:bg-red-500/50 text-white px-4 py-2 rounded text-sm border border-red-500/50">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;