import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import RazorpayButton from '../components/RazorpayButton';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const dummyData = {
          _id: id,
          title: 'E-Commerce NextJS Kit',
          description: 'A complete full-stack e-commerce solution built with Next.js App Router, Tailwind CSS, Stripe integration for payments, and a fully functional admin dashboard to manage products and orders. Perfect for launching your online store in days rather than months.',
          price: 99,
          image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80',
          technologies: ['Next.js 14', 'React', 'Tailwind CSS', 'Stripe', 'Prisma', 'PostgreSQL'],
          features: [
            'Fully responsive modern design',
            'Integrated payment gateway',
            'Admin dashboard with analytics',
            'Order tracking & history',
            'SEO optimized and high performance'
          ]
        };

        try {
          const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
          setProject(res.data);
        } catch (err) {
          console.log("Using dummy data");
          setProject(dummyData);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-white">Loading...</div>;
  if (!project) return <div className="text-center py-20 text-white">Project not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
        <ArrowLeft size={20} />
        <span>Back to Projects</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Col: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl overflow-hidden glass-panel"
        >
          <img src={project.image} alt={project.title} className="w-full h-[400px] object-cover" />
        </motion.div>

        {/* Right Col: Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{project.title}</h1>
          <div className="text-3xl text-primary font-bold mb-6">${project.price}</div>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            {project.description}
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
            <ul className="space-y-3">
              {project.features?.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, idx) => (
                <span key={idx} className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <RazorpayButton project={project} />
            <p className="text-center text-sm text-gray-500 mt-4">
              Secure payments powered by Razorpay. 100% money-back guarantee.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
