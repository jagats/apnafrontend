import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold">My App</Link>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white focus:outline-none"
            >
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </motion.svg>
            </button>
          </div>

          {/* Desktop Navbar Items */}
          <div className="hidden md:flex space-x-4">
            <Link to="/start" className="text-gray-300 hover:text-white">Profile</Link>
            <Link to="/start/topics" className="text-gray-300 hover:text-white">Topics</Link>
            <Link to="/start/progress" className="text-gray-300 hover:text-white">Progress</Link>
            <button onClick={handleLogout} className="text-gray-300 hover:text-white px-4 py-2 border border-gray-600 rounded-md">Logout</button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Appears when isMenuOpen is true) */}
      <motion.div 
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-4 p-4 bg-gray-800 text-white">
          <Link to="/start" className="block hover:text-gray-400">Profile</Link>
          <Link to="/start/topics" className="block hover:text-gray-400">Topics</Link>
          <Link to="/start/progress" className="block hover:text-gray-400">Progress</Link>
          <button 
            onClick={handleLogout} 
            className="block w-full text-left py-2 px-4 text-gray-300 hover:text-white border-t border-gray-600"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </nav>
  );
}

export default Navbar;