import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg text-white">
              <Code2 size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Rahul <span className="text-primary">Developer</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Projects</Link>
            <a href="/#about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About Me</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Contact</a>
            
            {/* Login Button */}
            <Link 
              to="/login"
              className="bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
