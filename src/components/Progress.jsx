import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { motion, AnimatePresence } from 'framer-motion';

export default function Progress() {
  const [completedTopics, setCompletedTopics] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/topics/progress', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCompletedTopics(res.data.completed || []);
      } catch (err) {
        console.error('Error fetching progress', err);
      }
    };
    fetchProgress();
  }, [refreshTrigger]);

  const handleDelete = async (topicId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/topics/progress/delete', { topicId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCompletedTopics(prev => prev.filter(topic => topic._id !== topicId));
      setSuccess('Topic removed from progress!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error deleting topic from progress', err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Your Progress
        </h2>
        {success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-green-600 mb-4 text-center"
          >
            {success}
          </motion.p>
        )}
        {completedTopics.length ? (
          <ul className="space-y-4">
            <AnimatePresence>
              {completedTopics.map(topic => (
                <motion.li
                  key={topic._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between border border-gray-100"
                >
                  <span className="text-lg font-semibold text-gray-800">{topic.title}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-green-600 font-medium flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Completed
                    </span>
                    <button
                      onClick={() => handleDelete(topic._id)}
                      className="text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-gray-600 text-lg">No topics completed yet.</p>
            <p className="text-gray-500 mt-2">Keep learning to track your progress!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}