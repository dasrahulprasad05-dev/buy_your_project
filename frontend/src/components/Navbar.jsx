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
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Projects</Link>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About Me</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
