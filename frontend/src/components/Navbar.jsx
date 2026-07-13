import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 backdrop-blur-md bg-[#030305]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg text-white">
              <Code2 size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Rahul <span className="text-primary">Developer</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#projects" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Projects</a>
            <a href="/#about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About Me</a>
            <a href="/#contact" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Contact</a>
            
            {/* Login Button */}
            <Link 
              to="/login"
              className="bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg bg-white/5 border border-white/10"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#0a0a10] border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col shadow-2xl">
              <a 
                href="/#projects" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                Projects
              </a>
              <a 
                href="/#about" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                About Me
              </a>
              <a 
                href="/#contact" 
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                Contact
              </a>
              
              <div className="pt-4 px-2">
                <Link 
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-primary hover:bg-primary/90 text-white px-5 py-3.5 rounded-xl text-base font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
