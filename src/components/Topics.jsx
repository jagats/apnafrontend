import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { motion, AnimatePresence } from 'framer-motion';

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [levelFilter, setLevelFilter] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/topics/topics', {
          headers: { Authorization: `Bearer ${token}` },
          params: { level: levelFilter || undefined },
        });
        setTopics(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching topics', err);
        setError('Failed to load topics. Please try again.');
      }
    };
    fetchTopics();
  }, [levelFilter]);

  const toggleSubtopics = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCompletion = async (topicId, subTopicIndex, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/topics/topics/complete', {
        topicId,
        subTopicIndex,
        completed: !currentStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTopics(prevTopics =>
        prevTopics.map(topic =>
          topic._id === topicId
            ? {
                ...topic,
                subTopics: topic.subTopics.map((sub, i) =>
                  i === subTopicIndex ? { ...sub, completed: !currentStatus } : sub
                ),
              }
            : topic
        )
      );

      setSuccess('Subtopic status updated!');
      setError(null);
      setTimeout(() => setSuccess(null), 3000);

      // Refresh topics to ensure sync with backend
      const resTopics = await axios.get('/api/topics/topics', {
        headers: { Authorization: `Bearer ${token}` },
        params: { level: levelFilter || undefined },
      });
      setTopics(resTopics.data);
    } catch (err) {
      console.error('Error updating subtopic status:', err);
      setError('Failed to update subtopic status.');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">
            All Topics
          </h2>
          <div className="flex items-center space-x-2">
            <label htmlFor="levelFilter" className="text-gray-600 font-medium">
              Filter by Level:
            </label>
            <select
              id="levelFilter"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
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
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-red-600 mb-4 text-center"
          >
            {error}
          </motion.p>
        )}
        {topics.length === 0 ? (
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
            <p className="text-gray-600 mt-2">Loading topics...</p>
          </motion.div>
        ) : (
          <ul className="space-y-6">
            {topics.map(topic => (
              <motion.li
                key={topic._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">{topic.title}</span>
                  <button
                    onClick={() => toggleSubtopics(topic._id)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    {expanded[topic._id] ? 'Hide Subtopics' : 'View Subtopics'}
                  </button>
                </div>

                <AnimatePresence>
                  {expanded[topic._id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <table className="w-full mt-6 text-sm border border-gray-200 rounded-lg">
                        <thead>
                          <tr className="bg-gray-50 text-gray-700">
                            <th className="px-4 py-3 text-left font-medium">Title</th>
                            <th className="px-4 py-3 text-left font-medium">Level</th>
                            <th className="px-4 py-3 text-left font-medium">Links</th>
                            <th className="px-4 py-3 text-center font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topic.subTopics.map((sub, index) => (
                            <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                              <td className="px-4 py-3 text-gray-800">{sub.title}</td>
                              <td className="px-4 py-3 text-gray-600">{sub.level}</td>
                              <td className="px-4 py-3 space-x-3">
                                {sub.youtubeLink && (
                                  <a
                                    href={sub.youtubeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-500 hover:text-red-700 font-medium"
                                  >
                                    YouTube
                                  </a>
                                )}
                                {sub.leetcodeLink && (
                                  <a
                                    href={sub.leetcodeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-500 hover:text-purple-700 font-medium"
                                  >
                                    LeetCode
                                  </a>
                                )}
                                {sub.articleLink && (
                                  <a
                                    href={sub.articleLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-500 hover:text-green-700 font-medium"
                                  >
                                    Article
                                  </a>
                                )}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="flex items-center justify-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={sub.completed}
                                    onChange={() => toggleCompletion(topic._id, index, sub.completed)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className={`text-sm ${sub.completed ? 'text-green-600' : 'text-gray-600'}`}>
                                    {sub.completed ? 'Done' : 'Pending'}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}