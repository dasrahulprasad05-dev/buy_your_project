import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects3D from '../components/Projects3D';

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
      <Hero />
      
      <About />

      {/* 3D Projects Section */}
      <div id="projects" className="mt-10 w-full pb-20">
        <Projects3D />
      </div>
    </div>
  );
};

export default Home;
