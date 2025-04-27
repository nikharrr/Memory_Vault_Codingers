import { useState } from 'react';
import axios from 'axios'; // ✅ Axios imported

function Login({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/patients/login', {
        email: formData.email,
        password: formData.password,
      });

      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));

      onNavigate('dashboard');
      window.location.reload();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/patients/signup', {
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
        birth_date: '2000-01-01', // 👈 placeholder, since no field in form
      });

      const user = response.data.patient;
      localStorage.setItem('user', JSON.stringify(user));

      onNavigate('dashboard');
      window.location.reload();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Signup failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl w-full max-w-md">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 font-semibold border-b-2 ${
              activeTab === 'login'
                ? 'border-yellow-300 text-yellow-300'
                : 'border-transparent text-gray-400'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 font-semibold border-b-2 ${
              activeTab === 'signup'
                ? 'border-yellow-300 text-yellow-300'
                : 'border-transparent text-gray-400'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? 'bg-yellow-700'
                  : 'bg-yellow-600 hover:bg-yellow-700'
              } text-white font-bold py-2 px-4 rounded transition-colors`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="text-center mt-4">
              <a
                href="#"
                className="text-sm text-yellow-300 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('forgotPassword');
                }}
              >
                Forgot your password?
              </a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                placeholder="••••••••"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? 'bg-yellow-700'
                  : 'bg-yellow-600 hover:bg-yellow-700'
              } text-white font-bold py-2 px-4 rounded transition-colors`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
