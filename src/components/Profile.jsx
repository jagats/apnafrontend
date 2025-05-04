import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { motion } from 'framer-motion';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        setSuccess('Profile loaded successfully!');
        setError(null);
      } catch (err) {
        console.error('Error fetching profile', err);
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          User Profile
        </h2>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            </div>
            <p className="text-gray-600 mt-2">Loading profile...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-red-600"
          >
            <p>{error}</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
          >
            {success && (
              <p className="text-green-600 mb-4 text-center">{success}</p>
            )}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Username</h3>
                <p className="text-gray-600">{user.username}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}