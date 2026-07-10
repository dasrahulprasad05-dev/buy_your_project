import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fallback dummy data if backend is not running or no projects seeded
        const dummyData = [
          {
            _id: '1',
            title: 'E-Commerce NextJS Kit',
            description: 'A full-stack e-commerce template with payment gateway integration, admin dashboard, and shopping cart functionality.',
            price: 99,
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
            technologies: ['Next.js', 'React', 'Tailwind CSS', 'Stripe']
          },
          {
            _id: '2',
            title: 'SaaS Dashboard Template',
            description: 'Beautiful admin dashboard template for SaaS applications with charts, tables, and authentication UI.',
            price: 49,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
            technologies: ['React', 'Vite', 'Recharts', 'Tailwind CSS']
          }
        ];

        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/projects`);
          setProjects(res.data.length > 0 ? res.data : dummyData);
        } catch (err) {
          console.log("Using dummy data, backend might not be running.");
          setProjects(dummyData);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center py-20 text-white">Loading projects...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="py-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-6"
        >
          Premium Developer Projects
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto"
        >
          High-quality, ready-to-use project templates and applications built with modern web technologies by Rahul Developer.
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {projects.map((project, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={project._id} 
            className="glass-panel rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white font-semibold">
                ${project.price}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span key={i} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-md">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-md">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              <Link 
                to={`/project/${project._id}`}
                className="block w-full text-center bg-primary hover:bg-primaryHover text-white font-medium py-2.5 rounded-xl transition-colors"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
